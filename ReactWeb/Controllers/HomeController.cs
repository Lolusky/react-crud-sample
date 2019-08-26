using ReactWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace ReactWeb.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			var config = new TableConfig()
			{
				ColumnDef = new List<ColumnData>()
				  {
					  new ColumnData(){ Caption="First Name", Field ="firstName"},
					  new ColumnData(){ Caption="Last Name", Field ="lastName"},
					  new ColumnData(){ Caption="Age", Field ="age"},
					  new ColumnData(){ Caption="Address", Field ="address"},
					  new ColumnData(){ Caption="Country", Field ="country"},
				  },
				ChildColumnDef=new List<ColumnData>()
				{
					new ColumnData(){Caption="Title", Field="title"},
					new ColumnData(){Caption ="Description", Field="description"},
					new ColumnData(){Caption ="Date", Field="date"},
				},
				DeleteUrl = Url.Action("DeleteEmployee"),
				SubmitUrl = Url.Action("SaveEmployees"),
				LoadDataUrl = Url.Action("LoadEmployees"),
			};

			return View(config);
		}

		public ActionResult LoadEmployees()
		{
			var existing = loadExistingData();

			var data = GetJsonString(new { data = existing, success = true });

			return Content(data);
		}

		public ActionResult DeleteEmployee(int employeeId)
		{
			var existing = loadExistingData();
			existing.Remove(existing.FirstOrDefault(o => o.EmployeeId == employeeId));
			SaveToFile(existing);

			return Content(GetJsonString(new { data = employeeId, success = true }));
		}



		public ActionResult SaveEmployees(List<Employee> models)
		{

			var existing = loadExistingData();

			existing
				.Where(e => models.Any(e2 => e2.EmployeeId == e.EmployeeId))
				.ToList()
				.ForEach(e =>
					{
						var edited = models.FirstOrDefault(o => o.EmployeeId == e.EmployeeId);
						e.Address = edited.Address;
						e.Age = edited.Age;
						e.Country = edited.Country;
						e.FirstName = edited.FirstName;
						e.LastName = edited.LastName;
						e.EmployeeActivities = edited.EmployeeActivities;
					});

			existing.AddRange(models
						.Where(e => !existing
						.Any(e2 => e2.EmployeeId == e.EmployeeId)));

			SaveToFile(existing);

			return Content(GetJsonString(new { data = models, success = true }));
		}

		List<Employee> loadExistingData()
		{
			var dataPath = System.IO.Path.Combine(Server.MapPath("~/App_Data/"), "dataStore.json");
			if (!System.IO.File.Exists(dataPath))
			{
				return new List<Employee>();
			}

			using (var str = new System.IO.StreamReader(dataPath))
			{
				var existingData = JsonConvert.DeserializeObject<List<Employee>>(str.ReadToEnd());
				str.Close();
				return existingData;
			}
		}

		void SaveToFile(List<Employee> models)
		{
			var dataPath = System.IO.Path.Combine(Server.MapPath("~/App_Data/"), "dataStore.json");
			using (var str = new System.IO.StreamWriter(dataPath))
			{
				str.Write(JsonConvert.SerializeObject(models));
				str.Close();
			}
		}


		string GetJsonString(object data)
		{
			return JsonConvert.SerializeObject(data
		  ,
		  new JsonSerializerSettings
		  {
			  ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver(),
			  DateFormatString = System.Threading.Thread.CurrentThread.CurrentCulture.DateTimeFormat.ShortDatePattern
		  });

		}

		public ActionResult About()
		{
			ViewBag.Message = "Your application description page.";

			return View();
		}

		public ActionResult Contact()
		{
			ViewBag.Message = "Your contact page.";

			return View();
		}
	}
}