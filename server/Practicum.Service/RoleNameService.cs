using Practicum.Core.Models;
using Practicum.Core.Repositories;
using Practicum.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Service
{
    public class RoleNameService : IRoleNameServiece
    {
        private readonly IRoleNameRepository _roleNameRepository;
        public RoleNameService(IRoleNameRepository roleNameRepository)
        {
            _roleNameRepository = roleNameRepository;
        }

        public async Task<RoleName> AddAsync(RoleName roleName)
        {
            return await _roleNameRepository.AddAsync(roleName);
        }

        public async Task<IEnumerable<RoleName>> GetAllAsync()
        {
            return await _roleNameRepository.GetAllAsync();
        }
    }
}
