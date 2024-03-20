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
    public class RoleNameRepository : IRoleNameRepository
    {
        private readonly DataContext _dataContext;

        public RoleNameRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<RoleName> AddAsync(RoleName roleName)
        {
            _dataContext.RoleNamesArr.Add(roleName);
            await _dataContext.SaveChangesAsync();
            return roleName;
        }

        public async Task<IEnumerable<RoleName>> GetAllAsync()
        {
            return await _dataContext.RoleNamesArr.ToListAsync();
        }
    }
}
