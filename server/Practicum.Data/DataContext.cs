using Microsoft.EntityFrameworkCore;
using Practicum.Core.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicum.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<RoleName> RoleNamesArr { get; set; }

        public DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=my_database");
            optionsBuilder.LogTo((message) => Debug.Write(message));
        }
       
    }
}