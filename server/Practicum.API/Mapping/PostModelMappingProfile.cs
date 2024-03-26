
using AutoMapper;
using Practicum.API.Models;
using Practicum.Core.Models;

namespace Practicum.API.Mapping
{
    public class PostModelMappingProfile: Profile
    {
       public PostModelMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>();
            CreateMap<RolePostModel, EmployeeRole>();
            CreateMap<RoleNamePostModel, RoleName>();
        }
    }
}
