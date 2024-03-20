using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Services
{
    public interface IRoleNameServiece
    {
        Task<IEnumerable<RoleName>> GetAllAsync();
        Task<RoleName> AddAsync(RoleName roleName);
    }
}
