using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Practicum.Data.Migrations
{
    public partial class creatDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Identity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartOfWorkDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaleOrFemale = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Positions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Positions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmployeePositions",
                columns: table => new
                {
                    PositionId = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    ManagerialPosition = table.Column<bool>(type: "bit", nullable: false),
                    DateOfStartingWork = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePositions", x => new { x.PositionId, x.EmployeeId });
                    table.ForeignKey(
                        name: "FK_EmployeePositions_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeePositions_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "DateOfBirth", "FirstName", "Identity", "LastName", "MaleOrFemale", "StartOfWorkDate", "Status" },
                values: new object[,]
                {
                    { 1, new DateTime(1990, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Rachel", "123456789", "Levi", false, new DateTime(2023, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true },
                    { 2, new DateTime(1985, 3, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Joseph", "987654321", "Cohen", true, new DateTime(2024, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), true },
                    { 3, new DateTime(1988, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sarah", "123123123", "Johnson", false, new DateTime(2022, 5, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), true },
                    { 4, new DateTime(1995, 2, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "John", "456456456", "Smith", true, new DateTime(2023, 11, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), true },
                    { 5, new DateTime(1987, 4, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Emily", "789789789", "Davis", false, new DateTime(2022, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), true },
                    { 6, new DateTime(1992, 9, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Michael", "654654654", "Martinez", true, new DateTime(2024, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), true },
                    { 7, new DateTime(1986, 11, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "Jessica", "321321321", "Brown", false, new DateTime(2023, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), true },
                    { 8, new DateTime(1998, 12, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Daniel", "987987987", "Wilson", true, new DateTime(2022, 6, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), true }
                });

            migrationBuilder.InsertData(
                table: "Positions",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Manager" },
                    { 2, "Employee" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Name", "Password" },
                values: new object[,]
                {
                    { 1, "admin", "123456" },
                    { 2, "user", "654321" }
                });

            migrationBuilder.InsertData(
                table: "EmployeePositions",
                columns: new[] { "EmployeeId", "PositionId", "DateOfStartingWork", "ManagerialPosition" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2023, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true },
                    { 3, 1, new DateTime(2022, 5, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), true },
                    { 5, 1, new DateTime(2022, 12, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), true },
                    { 7, 1, new DateTime(2023, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), true },
                    { 2, 2, new DateTime(2024, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 4, 2, new DateTime(2023, 11, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 6, 2, new DateTime(2024, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), false },
                    { 8, 2, new DateTime(2022, 6, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), false }
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePositions_EmployeeId",
                table: "EmployeePositions",
                column: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeePositions");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Positions");
        }
    }
}
