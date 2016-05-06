using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace WebApiSignalr.Hubs
{
    public class ChatHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();

        public void Send(string name, string message)
        {
            hubContext.Clients.All.addItem(name, message);
        }  
    }
}