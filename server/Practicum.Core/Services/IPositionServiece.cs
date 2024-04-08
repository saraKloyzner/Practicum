using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Services
{
    public interface IPositionServiece
    {
        Task<IEnumerable<Position>> GetAllAsync();
        Task<Position> AddAsync(Position position);
    }
}
