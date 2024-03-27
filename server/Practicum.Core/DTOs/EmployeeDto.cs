using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.DTOs
{
    public class EmployeeDto
    {
        //public string Identity { get; set; }//אולי כדאי להוריד
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Id { get; set; }
        public DateTime StartOfWorkDate { get; set; }
       

    }
}
