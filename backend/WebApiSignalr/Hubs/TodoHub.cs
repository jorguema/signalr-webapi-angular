using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace WebApiSignalr.Hubs
{
    public class TodoHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<TodoHub>();

        public void Send(string name, string message)
        {
            // Call the addNewMessageToPage method to update clients.
            hubContext.Clients.All.addTodoItem(name, message);
        }        
        
        public void Delete(string name, string message)
        {
             hubContext.Clients.All.deleteTodoItem(name, message);
        }
    }
}