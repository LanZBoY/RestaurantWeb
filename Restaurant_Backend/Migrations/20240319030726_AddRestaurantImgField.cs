using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Restaurant.Migrations
{
    /// <inheritdoc />
    public partial class AddRestaurantImgField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "uId",
                table: "UserRestaurantRate",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "rId",
                table: "UserRestaurantRate",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Img",
                table: "Restaurant",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRestaurantRate",
                table: "UserRestaurantRate",
                columns: new[] { "uId", "rId" });
            // InsertRestaurantData
            migrationBuilder.InsertData(
                table: "Restaurant",
                columns: new[]{
                    "rId",
                    "Name",
                    "Desc",
                    "Img"
                },
                values: new object[,]{
                    {Guid.NewGuid().ToString(),"逢甲酸菜魚", "很好吃", "逢甲酸菜魚.jpg"},
                    {Guid.NewGuid().ToString(),"漢來海港", "好好吃", "漢來海港.jpg"},
                    {Guid.NewGuid().ToString(),"大喜鍋", "便宜好吃", "大喜鍋.jpg"},
                    {Guid.NewGuid().ToString(),"逢甲大麻粉圓", "從小吃到大", "逢甲大麻粉圓.jpg"},
                    {Guid.NewGuid().ToString(),"大王牛肉麵", "麵條很Q", "大王牛肉麵.jpg"},
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRestaurantRate",
                table: "UserRestaurantRate");

            migrationBuilder.DropColumn(
                name: "Img",
                table: "Restaurant");

            migrationBuilder.AlterColumn<Guid>(
                name: "rId",
                table: "UserRestaurantRate",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<Guid>(
                name: "uId",
                table: "UserRestaurantRate",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");
        }
    }
}
