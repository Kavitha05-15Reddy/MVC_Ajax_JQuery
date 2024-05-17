using Microsoft.AspNetCore.Mvc;
using MVCAjaxJQuery.Context;
using MVCAjaxJQuery.Entity;

namespace MVCAjaxJQuery.Controllers
{
    public class AjaxController : Controller
    {
        private readonly EmployeeContext context;
        public AjaxController(EmployeeContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            var result = context.Employees.ToList();
            return View(result);
        }

        //GetAllEmployees
        [HttpGet]
        public JsonResult EmployeeList()
        {
            var data = context.Employees.ToList();
            return new JsonResult(data);
        }

        //Insert
        [HttpPost]
        public JsonResult AddEmployee(Employee employee)
        {
            var emp = new Employee()
            {
                Name = employee.Name,
                City = employee.City,
                State = employee.State,
                Salary = employee.Salary,
            };
            context.Employees.Add(emp);
            context.SaveChanges();
            return new JsonResult("Data is Saved");
        }

        //Delete
        public JsonResult Delete(int id)
        {
            var data = context.Employees.Where(e => e.Id == id).SingleOrDefault();
            context.Employees.Remove(data);
            context.SaveChanges();
            return new JsonResult("Data Deleted");
        }

        //GetById
        public JsonResult Edit(int id)
        {
            var data = context.Employees.Where(e => e.Id == id).SingleOrDefault();
            return new JsonResult(data);
        }

        //Update
        [HttpPost]
        public JsonResult Update(Employee employee)
        {
            context.Employees.Update(employee);
            context.SaveChanges();
            return new JsonResult("Data Updated");
        }
    }
}
