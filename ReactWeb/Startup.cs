using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ReactWeb.Startup))]
namespace ReactWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
