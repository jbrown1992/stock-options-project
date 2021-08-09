using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StockOptionsApi.Models
{
    public class Stock
    {

        [Key]
        public int id { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string ticker { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public Decimal Quantity { get; set; }
        public Decimal AveragePrice { get; set; }
        public Decimal CurrentPrice { get; set; }


    }
}
