using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class EmployeePosition
    {

        public int PositionId { get; set; }
        public int EmployeeId { get; set; }
        public bool ManagerialPosition { get; set; }
        public DateTime DateOfStartingWork { get; set; }
    }
}
