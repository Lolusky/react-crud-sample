using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace ReactWeb
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

			var jsonSerializerSettings = new JsonSerializerSettings
			{
				Formatting = Formatting.Indented,
				PreserveReferencesHandling = PreserveReferencesHandling.Objects,
				ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver()
			};
			jsonSerializerSettings.Converters.Add(new IsoDateTimeConverter());
			GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings = jsonSerializerSettings;
			GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

 
		}
    }
}
