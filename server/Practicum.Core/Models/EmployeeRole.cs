using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class EmployeeRole
    {

        public int RoleNameId { get; set; }
        public int EmployeeId { get; set; }
        public bool ManagerialPosition { get; set; }//ניהולי?
        public DateTime DateOfStartingWork { get; set; }
    }
}
