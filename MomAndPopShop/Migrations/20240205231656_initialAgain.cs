using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MomAndPopShop.Migrations
{
    public partial class initialAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserAdress",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserPhone",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserAdress",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserPhone",
                table: "AspNetUsers");
        }
    }
}
