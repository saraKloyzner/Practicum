using Practicum.Core.Models;

namespace Practicum.API.Models
{
    public class EmployeePositionPostModel
    {
        public int PositionId { get; set; }
    
        public bool ManagerialPosition { get; set; }//ניהולי?
        public DateTime DateOfStartingWork { get; set; }
    }
}
