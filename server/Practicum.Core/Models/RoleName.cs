using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class RoleName
    {
        public int  Id { get; set; }
        public string Name { get; set; }
        public List<EmployeeRole> roleEmployees { get; set; }
    }
}
