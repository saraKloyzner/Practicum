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
   
    public class PositionsController : ControllerBase
    {
        private readonly IPositionServiece _position;
        private readonly IMapper _mapper;

        public PositionsController(IPositionServiece position, IMapper mapper)
        {
            _position = position;
            _mapper = mapper;
        }
        // GET: api/<PositinsController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var positions=await _position.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<PositionDto>>(positions));
        }

       

        // POST api/<PositinsController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] PositionPostModel name)
        {
            if(name==null||string.IsNullOrEmpty(name.Name))
                return BadRequest(new
                {
                    error = "Invalid data",
                });
            var position = await _position.AddAsync(_mapper.Map<Position>(name));
            return Ok(_mapper.Map<PositionDto>(position));
        }

        // PUT api/<PositinsController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<PositinsController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
