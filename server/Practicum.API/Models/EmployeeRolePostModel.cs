﻿using Practicum.Core.Models;

namespace Practicum.API.Models
{
    public class EmployeeRolePostModel
    {
        public int RoleNameId { get; set; }
    
        public bool ManagerialPosition { get; set; }//ניהולי?
        public DateTime DateOfStartingWork { get; set; }
    }
}