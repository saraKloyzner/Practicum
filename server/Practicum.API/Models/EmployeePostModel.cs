using Practicum.Core.Models;

namespace Practicum.API.Models
{
    public class EmployeePostModel
    {
        
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        public DateTime StartOfWorkDate { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool MaleOrFemale { get; set; }
        public bool Status { get; set; }
        public List<EmployeePositionPostModel> EmployeePositions { get; set; }
    }
}
