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
        public DbSet<Position> PositionsArr { get; set; }
        public DbSet<EmployeePosition> EmployeePositions { get; set; }
        public DbSet<User> Users { get; set; }
       
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=my_db1");
            optionsBuilder.LogTo((message) => Debug.Write(message));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeePosition>()
                .HasKey(e => new { e.PositionId, e.EmployeeId });
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Position>().ToTable("Positions");
            modelBuilder.Entity<Employee>().ToTable("Employees");
            modelBuilder.Entity<EmployeePosition>().ToTable("EmployeePositions");

            // Seed initial data
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Name = "admin", Password = "123456" },
                new User { Id = 2, Name = "user", Password = "654321" }
            );

            modelBuilder.Entity<Position>().HasData(
                new Position { Id = 1, Name = "Manager" },
                new Position { Id = 2, Name = "Employee" }
            );

            modelBuilder.Entity<Employee>().HasData(
                new Employee { Id = 1, Identity = "123456789", FirstName = "Rachel", LastName = "Levi", StartOfWorkDate = DateTime.Parse("2023-09-01"), DateOfBirth = DateTime.Parse("1990-01-01"), MaleOrFemale = false, Status = true },
                new Employee { Id = 2, Identity = "987654321", FirstName = "Joseph", LastName = "Cohen", StartOfWorkDate = DateTime.Parse("2024-01-15"), DateOfBirth = DateTime.Parse("1985-03-15"), MaleOrFemale = true, Status = true },
                new Employee { Id = 3, Identity = "123123123", FirstName = "Sarah", LastName = "Johnson", StartOfWorkDate = DateTime.Parse("2022-05-20"), DateOfBirth = DateTime.Parse("1988-07-10"), MaleOrFemale = false, Status = true },
                new Employee { Id = 4, Identity = "456456456", FirstName = "John", LastName = "Smith", StartOfWorkDate = DateTime.Parse("2023-11-05"), DateOfBirth = DateTime.Parse("1995-02-28"), MaleOrFemale = true, Status = true },
                new Employee { Id = 5, Identity = "789789789", FirstName = "Emily", LastName = "Davis", StartOfWorkDate = DateTime.Parse("2022-12-10"), DateOfBirth = DateTime.Parse("1987-04-15"), MaleOrFemale = false, Status = true },
                new Employee { Id = 6, Identity = "654654654", FirstName = "Michael", LastName = "Martinez", StartOfWorkDate = DateTime.Parse("2024-03-25"), DateOfBirth = DateTime.Parse("1992-09-20"), MaleOrFemale = true, Status = true },
                new Employee { Id = 7, Identity = "321321321", FirstName = "Jessica", LastName = "Brown", StartOfWorkDate = DateTime.Parse("2023-08-15"), DateOfBirth = DateTime.Parse("1986-11-18"), MaleOrFemale = false, Status = true },
                new Employee { Id = 8, Identity = "987987987", FirstName = "Daniel", LastName = "Wilson", StartOfWorkDate = DateTime.Parse("2022-06-30"), DateOfBirth = DateTime.Parse("1998-12-05"), MaleOrFemale = true, Status = true }
            );

            modelBuilder.Entity<EmployeePosition>().HasData(
                new EmployeePosition { PositionId = 1, EmployeeId = 1, ManagerialPosition = true, DateOfStartingWork = DateTime.Parse("2023-09-01") },
                new EmployeePosition { PositionId = 2, EmployeeId = 2, ManagerialPosition = false, DateOfStartingWork = DateTime.Parse("2024-01-15") },
                new EmployeePosition { PositionId = 1, EmployeeId = 3, ManagerialPosition = true, DateOfStartingWork = DateTime.Parse("2022-05-20") },
                new EmployeePosition { PositionId = 2, EmployeeId = 4, ManagerialPosition = false, DateOfStartingWork = DateTime.Parse("2023-11-05") },
                new EmployeePosition { PositionId = 1, EmployeeId = 5, ManagerialPosition = true, DateOfStartingWork = DateTime.Parse("2022-12-10") },
                new EmployeePosition { PositionId = 2, EmployeeId = 6, ManagerialPosition = false, DateOfStartingWork = DateTime.Parse("2024-03-25") },
                new EmployeePosition { PositionId = 1, EmployeeId = 7, ManagerialPosition = true, DateOfStartingWork = DateTime.Parse("2023-08-15") },
                new EmployeePosition { PositionId = 2, EmployeeId = 8, ManagerialPosition = false, DateOfStartingWork = DateTime.Parse("2022-06-30") }
            );
        }

    }
}