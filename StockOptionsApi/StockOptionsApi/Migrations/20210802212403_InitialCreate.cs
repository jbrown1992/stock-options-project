using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StockOptionsApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Options",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ticker = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    type = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    daysToExpiry = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    delta = table.Column<int>(type: "int", nullable: false),
                    strikePrice = table.Column<int>(type: "int", nullable: false),
                    stockPrice = table.Column<int>(type: "int", nullable: false),
                    premium = table.Column<int>(type: "int", nullable: false),
                    commision = table.Column<int>(type: "int", nullable: false),
                    contracts = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    startDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    expiryDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Options", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Options");
        }
    }
}
