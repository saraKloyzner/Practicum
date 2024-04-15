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
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {

            var validator = new EmployeePostModelValidator();
            if (!validator.Validate(employee))
            {
                return BadRequest(new
                {
                    error = "Invalid data",
                    details = "Some fields are missing or have invalid values"
                });
            }
            var newEmployee = await _employeeService.AddAsync(_mapper.Map<Employee>(employee));
            return Ok(_mapper.Map<EmployeeDto>(newEmployee));

        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{identity}")]
        public async Task<ActionResult> Put(string identity, [FromBody] EmployeePostModel employee)
        {
            var putEmployee = await _employeeService.GetByIdAsync(identity);
            if (putEmployee is null)
            {
                return NotFound();
            }
            var validator = new EmployeePostModelValidator();
            if (!validator.Validate(employee))
            {
                return BadRequest(new
                {
                    error = "Invalid data",
                    details = "Some fields are missing or have invalid values"
                });
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
        public class EmployeePostModelValidator
        {
            public bool Validate(EmployeePostModel employee)
            {
                if (employee == null ||
                    string.IsNullOrEmpty(employee.Identity) ||
                    string.IsNullOrEmpty(employee.FirstName) ||
                    string.IsNullOrEmpty(employee.LastName) ||
                    employee.StartOfWorkDate == default(DateTime) ||
                    employee.DateOfBirth == default(DateTime) ||
                    employee.EmployeePositions == null)
                {
                    return false;
                }

                foreach (var position in employee.EmployeePositions)
                {
                    if (position == null ||
                        position.PositionId <= 0 ||
                        position.DateOfStartingWork == default(DateTime))
                    {
                        return false;
                    }
                }

                return true;
            }
        }

    }
}
