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
            //CreateMap<Employee,EmployeeDto>();
            //CreateMap<EmployeeRole,EmployeeRoleDto>();
            //CreateMap<RoleName,RoleNameDto>();
            CreateMap<Employee, EmployeeDto>()
           .ForMember(dest => dest.employeeRolesDto, opt => opt.MapFrom(src => src.roleEmployees));
            CreateMap<EmployeeRole, EmployeeRoleDto>();
            CreateMap<RoleName, RoleNameDto>()
         .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Name));
        }
    }
}
