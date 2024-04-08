using Microsoft.EntityFrameworkCore;
using Practicum.Core.Models;
using Practicum.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {

        private readonly DataContext _dataContext;
        public EmployeeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            _dataContext.Employees.Add(employee);
            
            await _dataContext.SaveChangesAsync();
            return employee;
        }

        public async Task DeleteAsync(string employeeId)
        {

            //var employee = await GetByIdAsync(employeeId);
            //_dataContext.Employees.Remove(employee);

            //await _dataContext.SaveChangesAsync();

            var existingEmployee = _dataContext.Employees.FirstOrDefault(x => employeeId == x.Identity);
            if (existingEmployee == null)
            {
                throw new InvalidOperationException($"Employee with ID {employeeId} not found.");
            }
            existingEmployee.Status = false;
            //_dataContext.Employees.Remove(_dataContext.Employees.ToList().FirstOrDefault(x=>id==x.Identity));
            await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _dataContext.Employees.ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(string employeeId)
        {
            return await _dataContext.Employees.Include(c => c.EmployeePositions)
             .FirstOrDefaultAsync(c => c.Identity == employeeId);
        }
        public async Task<Employee> UpdateAsync(Employee employee)
        {
            var existEmployee = await GetByIdAsync(employee.Identity);
            _dataContext.Entry(existEmployee).CurrentValues.SetValues(existEmployee);
            _dataContext.SaveChangesAsync();
            return employee;
        }
       
    }
}
