using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MomAndPopShop.Migrations
{
    public partial class EditCartModelWithPopcornObject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "PopcornPrice",
                table: "Popcorns",
                type: "float(18)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AddColumn<int>(
                name: "CartItemId",
                table: "Popcorns",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "PopcornPrice",
                table: "CartItems",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<string>(
                name: "PopcornDescription",
                table: "CartItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PopcornId",
                table: "CartItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PopcornQuantity",
                table: "CartItems",
                type: "int",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Popcorns_CartItemId",
                table: "Popcorns",
                column: "CartItemId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_PopcornId",
                table: "CartItems",
                column: "PopcornId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_Popcorns_PopcornId",
                table: "CartItems",
                column: "PopcornId",
                principalTable: "Popcorns",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Popcorns_CartItems_CartItemId",
                table: "Popcorns",
                column: "CartItemId",
                principalTable: "CartItems",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_Popcorns_PopcornId",
                table: "CartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Popcorns_CartItems_CartItemId",
                table: "Popcorns");

            migrationBuilder.DropIndex(
                name: "IX_Popcorns_CartItemId",
                table: "Popcorns");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_PopcornId",
                table: "CartItems");

            migrationBuilder.DropColumn(
                name: "CartItemId",
                table: "Popcorns");

            migrationBuilder.DropColumn(
                name: "PopcornDescription",
                table: "CartItems");

            migrationBuilder.DropColumn(
                name: "PopcornId",
                table: "CartItems");

            migrationBuilder.DropColumn(
                name: "PopcornQuantity",
                table: "CartItems");

            migrationBuilder.AlterColumn<decimal>(
                name: "PopcornPrice",
                table: "Popcorns",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float(18)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AlterColumn<double>(
                name: "PopcornPrice",
                table: "CartItems",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);
        }
    }
}
