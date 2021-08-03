using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StockOptionsApi.Models
{
    public class Option
    {
        [Key]
        public int id { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string ticker { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string type { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public int daysToExpiry { get; set; }
        public Decimal delta { get; set; }
        public Decimal strikePrice { get; set; }
        public Decimal stockPrice { get; set; }
        public Decimal premium { get; set; }
        public Decimal commision { get; set; }
        public Decimal contracts { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string status { get; set; }
        public DateTime startDate { get; set; }
        public DateTime expiryDate { get; set; }

    }
}
