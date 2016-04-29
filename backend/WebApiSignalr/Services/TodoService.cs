using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApiSignalr.Services
{
    public class TodoService
    {
        private static List<string> data = null;
        private TodoHubService _todoHubService = new TodoHubService();

        public IEnumerable<string> getAll()
        {
            return data.AsEnumerable();
        }

        public void CreateTodo(string todoItem)
        {
            data.Add(todoItem);
            _todoHubService.CreateItem(todoItem);
        }

        public void Delete(string todoItem)
        {
            data.Remove(todoItem);
            _todoHubService.DeleteItem(todoItem);
        }

        private static TodoService instance;

        private TodoService() { }

        public static TodoService Instance()
        {

            if (instance == null)
            {
                instance = new TodoService();
                data = new List<string>() { "Potatoes", "Lemons" };
            }
            return instance;

        }
    }
}
