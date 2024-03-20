using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Practicum.Core.Models;
using Practicum.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Practicum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeServiece _employeeService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeServiece employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }


        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employees = await _employeeService.GetAllAsync();
            //return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
            return Ok(employees);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(string id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            //return Ok(_mapper.Map<EmployeeDto>(employee));
            return Ok(employee);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Employee employee)
        {
            var newEmployee=await _employeeService.AddAsync(employee);
            //return Ok(_mapper.Map<EmployeeDto>(newEmployee));
            return Ok(newEmployee);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<AcceptedResult> Put(string id, [FromBody] Employee employee)
        {
            var putEmployee = await _employeeService.GetByIdAsync(id);
            //if (putEmployee is null)
            //{
            //    return NotFound();
            //}
            putEmployee= await _employeeService.UpdateAsync(employee);
            return putEmployee;
            
            //_mapper.Map(model, employee);
            //await _employeeService.UpdateAsync(putEmployee);
            //em
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if(employee is null)
            {
                return NotFound();
            }
            await _employeeService.DeleteAsync(id);
            return NoContent();
        }
    }
}
