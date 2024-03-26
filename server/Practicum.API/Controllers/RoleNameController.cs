using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Practicum.API.Models;
using Practicum.Core.DTOs;
using Practicum.Core.Models;
using Practicum.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Practicum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class RoleNameController : ControllerBase
    {
        private readonly IRoleNameServiece _roleName;
        private readonly IMapper _mapper;

        public RoleNameController(IRoleNameServiece roleName, IMapper mapper)
        {
            _roleName = roleName;
            _mapper = mapper;
        }
        // GET: api/<RolesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var Roles=await _roleName.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<RoleNameDto>>(Roles));
        }

        // GET api/<RolesController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<RolesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RoleNamePostModel name)
        {
            var roleName = await _roleName.AddAsync(_mapper.Map<RoleName>(name));
            return Ok(_mapper.Map<RoleNameDto>(roleName));
        }

        // PUT api/<RolesController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<RolesController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
