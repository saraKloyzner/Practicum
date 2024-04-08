
using AutoMapper;
using Practicum.API.Models;
using Practicum.Core.Models;

namespace Practicum.API.Mapping
{
    public class PostModelMappingProfile: Profile
    {
       public PostModelMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<EmployeePositionPostModel, EmployeePosition>();
            CreateMap<PositionPostModel, Position>();
            
        }
    }
}
