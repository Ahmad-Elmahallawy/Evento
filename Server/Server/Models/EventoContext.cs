using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    public class EventoContext : DbContext
    {
        public DbSet<User> userTbl { get; set; }
        public DbSet<Event> eventTbl { get; set; }
        public DbSet<RSVP> rsvpTbl { get; set; }

        public EventoContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RSVP>().HasKey(rsvp => new { rsvp.UserId, rsvp.eventId });

            modelBuilder.Entity<RSVP>().HasOne(rsvp => rsvp.User).WithMany().HasForeignKey(rsvp => rsvp.UserId).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RSVP>()
                .HasOne(rsvp => rsvp.Event)
                .WithMany()
                .HasForeignKey(rsvp => rsvp.eventId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
