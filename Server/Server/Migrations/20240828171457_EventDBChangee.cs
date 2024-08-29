using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class EventDBChangee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "eventTbl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    userId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    currentCapacity = table.Column<int>(type: "int", nullable: false),
                    maximumCapacity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_eventTbl", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "rsvpTbl",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    eventId = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rsvpTbl", x => new { x.UserId, x.eventId });
                    table.ForeignKey(
                        name: "FK_rsvpTbl_eventTbl_eventId",
                        column: x => x.eventId,
                        principalTable: "eventTbl",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_rsvpTbl_eventId",
                table: "rsvpTbl",
                column: "eventId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "rsvpTbl");

            migrationBuilder.DropTable(
                name: "eventTbl");
        }
    }
}
