using Api.Data;
using Api.Models;
using Api.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class PasswordController(
        IPasswordService passwordService,
        IMapper mapper) : ControllerBase
    {

        [HttpGet]
        [Route("[action]")]
        [ProducesResponseType(typeof(IEnumerable<CredentialVM>), 200)]
        public async Task<IActionResult> Get()
        {
            var items = await passwordService.GetAsync();
            return Ok(mapper.Map<IEnumerable<CredentialVM>>(items));
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Create(CreateUpdateCredentialVM vm)
        {
            await passwordService.CreateAsync(mapper.Map<Credential>(vm));
            return Ok(vm);
        }

        [HttpPut]
        [Route("[action]/{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] CreateUpdateCredentialVM vm)
        {
            var result = await passwordService.UpdateAsync(id, mapper.Map<Credential>(vm));

            return (result == DbResult.OK) ? Ok(vm) : NotFound(id);
        }

        [HttpDelete]
        [Route("[action]/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await passwordService.RemoveAsync(id);

            return (result == DbResult.OK) ? Ok(id) : NotFound(id);
        }
    }
}
