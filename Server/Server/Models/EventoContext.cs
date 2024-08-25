using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    public class EventoContext : DbContext
    {
        public DbSet<Event> eventTbl { get; set; }
        public DbSet<RSVP> rsvpTbl { get; set; }

        public EventoContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RSVP>().HasKey(rsvp => new { rsvp.UserId, rsvp.eventId });

            modelBuilder.Entity<RSVP>()
                .HasOne(rsvp => rsvp.Event)
                .WithMany()
                .HasForeignKey(rsvp => rsvp.eventId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
