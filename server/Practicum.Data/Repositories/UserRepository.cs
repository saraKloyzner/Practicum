using Practicum.Core.Models;
using Practicum.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;
        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public  User GetByUserNameAndPassword(string userName, string password)
        {
            return  _dataContext.Users.FirstOrDefault(p => p.Name == userName && p.Password == password);
        }
    }
}
