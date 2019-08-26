using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReactWeb.Models
{
	public class TableConfig
	{
		public List<ColumnData> ColumnDef { get; set; }
		public List<ColumnData> ChildColumnDef { get; set; }
		public string SubmitUrl { get; set; }
		public string FetchUrl { get; set; }
		public string DeleteUrl { get; set; }
		public string LoadDataUrl { get; set; }

	}
}