using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockOptionsApi.Models
{
    public class OptionsDBContext : DbContext
    {
        //options are context options, not stock options
        public OptionsDBContext(DbContextOptions<OptionsDBContext> options):base(options)
        {

        }

        public DbSet<Option> Options { get; set; }
    }
}
