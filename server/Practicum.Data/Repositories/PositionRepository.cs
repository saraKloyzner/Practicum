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
    public class PositionRepository : IPositionRepository
    {
        private readonly DataContext _dataContext;

        public PositionRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Position> AddAsync(Position position)
        {
            _dataContext.PositionsArr.Add(position);
            await _dataContext.SaveChangesAsync();
            return position;
        }

        public async Task<IEnumerable<Position>> GetAllAsync()
        {
            return await _dataContext.PositionsArr.ToListAsync();
        }
    }
}
