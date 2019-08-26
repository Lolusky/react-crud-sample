using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReactWeb.Models
{
	public class Employee
	{
		public int EmployeeId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public int Age { get; set; }
		public string Address { get; set; }
		public string Country { get; set; }
		public List<EmployeeActivity> EmployeeActivities { get; set; } = new List<EmployeeActivity>();
	}
}