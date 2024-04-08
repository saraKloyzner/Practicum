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
   
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeServiece _employeeService;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeServiece employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }


        // GET: api/<EmployeeController>
        [HttpGet]
        //[Authorize]
        public async Task<ActionResult> Get()
        {
            var employees = await _employeeService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
            
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{identity}")]
        public async Task<ActionResult> Get(string identity)
        {
            var employee = await _employeeService.GetByIdAsync(identity);
            if(employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        //[Authorize]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(new { errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });
            //}
            var newEmployee=await _employeeService.AddAsync(_mapper.Map<Employee>(employee));
            return Ok(_mapper.Map<EmployeeDto>(newEmployee));
          
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{identity}")]
        //[Authorize]
        public async Task<ActionResult> Put(string identity, [FromBody] EmployeePostModel employee)
        {
            var putEmployee = await _employeeService.GetByIdAsync(identity);
            if (putEmployee is null)
            {
                return NotFound();
            }
            _mapper.Map(employee, putEmployee);
            await _employeeService.UpdateAsync(putEmployee);
            //putEmployee=await _employeeService.GetByIdAsync(id);
            //return Ok(_mapper.Map<EmployeeDto>(putEmployee));
            return Ok(putEmployee);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{identity}")]
        //[Authorize]
        public async Task<ActionResult> Delete(string identity)
        {
            var employee = await _employeeService.GetByIdAsync(identity);
            if(employee is null)
            {
                return NotFound();
            }
         
            await _employeeService.DeleteAsync(identity);
            return NoContent();
        }
    }
}
