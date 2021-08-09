using Microsoft.EntityFrameworkCore.Migrations;

namespace StockOptionsApi.Migrations
{
    public partial class StockTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stocks",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ticker = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Quantity = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    AveragePrice = table.Column<decimal>(nullable: false),
                    CurrentPrice = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stocks", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stocks");
        }
    }
}
