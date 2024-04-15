using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class Position
    {
        public int  Id { get; set; }
    
        public string Name { get; set; }
        public List<EmployeePosition> EmployeePositions { get; set; }
    }
}
