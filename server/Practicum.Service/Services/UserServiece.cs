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
    public class UserServiece : IUserServiece
    {
        private readonly IUserRepository _employeeRepository;

        public UserServiece(IUserRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public User GetByUserNameAndPassword(string userName, string password)
        {
            return _employeeRepository.GetByUserNameAndPassword(userName, password);
        }


    }
}
