using AutoMapper;
using Practicum.Core.DTOs;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Mapping
{
    public class MappingProfile :Profile
    {
      public MappingProfile()
        {
            CreateMap<Employee,EmployeeDto>();
            CreateMap<RoleName,RoleNameDto>();
        }
    }
}
