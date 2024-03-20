using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class Role
    {
        public int Id { get; set; }
        public RoleName RoleName { get; set; }
        public bool ManagerialPosition { get; set; }//ניהולי?
        public DateTime DateOfStartingWork { get; set; }
        //public Employee Employee { get; set; }//לבדוק אם יש צורך
        //public int EmployeeId { get; set; }//לבדוק האם צריך מפתח זר

       
    }
}
