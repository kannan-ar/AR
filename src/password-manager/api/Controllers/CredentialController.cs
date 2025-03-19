using Api.Data;
using Api.Models;
using Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class CredentialController(
        ICredentialService passwordService) : ControllerBase
    {

        [HttpGet("[action]/{id}")]
        [ProducesResponseType(typeof(CredentialVM), 200)]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await passwordService.GetAsync(id));
        }

        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<CredentialVM>), 200)]
        public IAsyncEnumerable<CredentialVM> Get()
        {
            return passwordService.GetAsync();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Create(CreateUpdateCredentialVM vm)
        {
            await passwordService.CreateAsync(vm);

            return Ok(vm);
        }

        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] CreateUpdateCredentialVM vm)
        {
            var result = await passwordService.UpdateAsync(id, vm);

            return (result == DbResult.OK) ? Ok(vm) : NotFound(id);
        }

        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await passwordService.RemoveAsync(id);

            return (result == DbResult.OK) ? Ok(id) : NotFound(id);
        }
    }
}
