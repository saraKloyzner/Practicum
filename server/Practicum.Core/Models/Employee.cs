using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Core.Models
{
    public class Employee
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Id { get; set; }
        public DateTime StartOfWorkDate { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool MaleOrFemale { get; set; }
        public List<Role> rolesArr { get; set; }
      
    }
}
