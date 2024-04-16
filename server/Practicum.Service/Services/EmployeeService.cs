using Practicum.Core.Models;
using Practicum.Core.Repositories;
using Practicum.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Service.Services
{
    public class EmployeeService : IEmployeeServiece
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            try
            {
                ValidateEmployee(employee);
                return await _employeeRepository.AddAsync(employee);
            }
            catch (ArgumentException ex)
            {
                throw new ArgumentException("Invalid employee data: " + ex.Message);
            }
        }

        public async Task DeleteAsync(string employeeId)
        {
            await _employeeRepository.DeleteAsync(employeeId);
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(string employeeId)
        {
            return await _employeeRepository.GetByIdAsync(employeeId);
        }

        public async Task<Employee> UpdateAsync(Employee employee)
        {
            try
            {
                ValidateEmployee(employee);
                return await _employeeRepository.UpdateAsync(employee);
            }
            catch (ArgumentException ex)
            {
                throw new ArgumentException("Invalid employee data: " + ex.Message);
            }

        }

        private void ValidateEmployee(Employee employee)
        {


            if (employee.Identity.Length != 9 || !employee.Identity.All(char.IsDigit))
            {
                throw new ArgumentException("Invalid Identity format. Identity must be a 9-digit number.", nameof(employee.Identity));
            }



            if (employee.FirstName.Length < 3)
            {
                throw new ArgumentException("First name must contain at least 3 characters.", nameof(employee.FirstName));
            }



            if (employee.LastName.Length < 3)
            {
                throw new ArgumentException("Last name must contain at least 3 characters.", nameof(employee.LastName));
            }



            if (employee.DateOfBirth > DateTime.Now)
            {
                throw new ArgumentException("Date of birth cannot be in the future.", nameof(employee.DateOfBirth));
            }

            var minAgeDateOfBirth = DateTime.Now.AddYears(-16);
            if (employee.DateOfBirth > minAgeDateOfBirth)
            {
                throw new ArgumentException("It is not legal to employ someone under 16 years old.", nameof(employee.DateOfBirth));
            }



            if (employee.StartOfWorkDate < minAgeDateOfBirth)
            {
                throw new ArgumentException("Start date of work cannot be before employee's 16th birthday.", nameof(employee.StartOfWorkDate));
            }

            if (employee.StartOfWorkDate < employee.DateOfBirth)
            {
                throw new ArgumentException("Start date of work cannot be before date of birth.", nameof(employee.StartOfWorkDate));
            }

            if (employee.EmployeePositions == null || employee.EmployeePositions.Count == 0)
            {
                throw new ArgumentException("At least one employee position is required.", nameof(employee.EmployeePositions));
            }

            foreach (var position in employee.EmployeePositions)
            {
                if (position == null)
                {
                    throw new ArgumentException("Employee position object cannot be null.", nameof(employee.EmployeePositions));
                }

                if (position.PositionId <= 0)
                {
                    throw new ArgumentException("Position ID must be greater than zero.", nameof(position.PositionId));
                }



                //if (position.DateOfStartingWork < employee.StartOfWorkDate)
                //{
                //    throw new ArgumentException("Date of starting work for employee position cannot be before start date of employee.", nameof(position.DateOfStartingWork));
                //}
            }
        }
    }
}
