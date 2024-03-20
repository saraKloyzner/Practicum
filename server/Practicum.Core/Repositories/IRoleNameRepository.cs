using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Repositories
{
    public interface IRoleNameRepository
    {
        Task<IEnumerable<RoleName>> GetAllAsync();
        Task<RoleName> AddAsync(RoleName roleName);
    }
}
