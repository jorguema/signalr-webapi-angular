using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApiSignalr.Services;

namespace WebApiSignalr.Controllers
{
    [RoutePrefix("api/todos")]
    public class TodoController : ApiController
    {
        private readonly TodoService _todoService;

        public TodoController()
        {
            _todoService = TodoService.Instance();
        }

        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(_todoService.getAll());
        }

        [Route("")]
        public IHttpActionResult Post([FromBody]ContentDto item)
        {
            _todoService.CreateTodo(item.Value);
            return Ok();
        }

         [Route("")]
        public IHttpActionResult Delete([FromBody]ContentDto item)
        {
            _todoService.Delete(item.Value);
            return Ok();
        }
    }

    public class ContentDto
    {
        public string Value { get; set; }
    }
}
