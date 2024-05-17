using Microsoft.EntityFrameworkCore;
using MVCAjaxJQuery.Entity;

namespace MVCAjaxJQuery.Context
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions options) : base(options) { }
        public DbSet<Employee> Employees { get; set; }
    }
}
