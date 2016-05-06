using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApiSignalr.Hubs;
using WebApiSignalr.Services;

namespace WebApiSignalr.Controllers
{
    [RoutePrefix("api/chats")]
    public class ChatController : ApiController
    {
        private ChatHub _chatHub;

        public ChatController()
        {
            DefaultHubManager hubManager = new DefaultHubManager(GlobalHost.DependencyResolver);
            _chatHub = hubManager.ResolveHub("ChatHub") as ChatHub;
        }

        [Route("")]
        public IHttpActionResult Post()
        {
            _chatHub.Send("API", "I'm GOD! all you banned");
            return Ok();
        }
    }
}
