using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TreeOfMfgPlants",
                columns: table => new
                {
                    NodeID = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    KeyID = table.Column<string>(type: "varchar(5)", unicode: false, maxLength: 5, nullable: true),
                    ParentID = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TreeOfMfgPlants", x => x.NodeID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TreeOfMfgPlants");
        }
    }
}
