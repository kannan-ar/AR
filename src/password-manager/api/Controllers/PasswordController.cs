using Api.Data;
using Api.Models;
using Api.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly IPasswordService _passwordService;
        private readonly IMapper _mapper;

        public PasswordController(
            IPasswordService passwordService,
            IMapper mapper)
        {
            _passwordService = passwordService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("[action]")]
        [ProducesResponseType(typeof(IEnumerable<CredentialVM>), 200)]
        public async Task<IActionResult> Get()
        {
            var items = await _passwordService.GetAsync();
            return Ok(_mapper.Map<IEnumerable<CredentialVM>>(items));
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Create(CreateUpdateCredentialVM vm)
        {
            await _passwordService.CreateAsync(_mapper.Map<Credential>(vm));
            return Ok(vm);
        }

        [HttpPut]
        [Route("[action]/{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] CreateUpdateCredentialVM vm)
        {
            var result = await _passwordService.UpdateAsync(id, _mapper.Map<Credential>(vm));

            return (result == DbResult.OK) ? Ok(vm) : NotFound(id);
        }

        [HttpDelete]
        [Route("[action]/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _passwordService.RemoveAsync(id);

            return (result == DbResult.OK) ? Ok(id) : NotFound(id);
        }
    }
}
