using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApiSignalr.Hubs;

namespace WebApiSignalr.Services
{
    class TodoHubService
    {
        private TodoHub _todoHub;

        public TodoHubService()
        {
            DefaultHubManager hubManager = new DefaultHubManager(GlobalHost.DependencyResolver);
            _todoHub = hubManager.ResolveHub("TodoHub") as TodoHub;
        }

        public void CreateItem(string item)
        {
            _todoHub.Send("API", item);
        }

        public void DeleteItem(string item)
        {
            _todoHub.Delete("API", item);
        }
    }
}
