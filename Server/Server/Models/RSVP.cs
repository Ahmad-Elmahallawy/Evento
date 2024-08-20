using Server.Models.Enums;

namespace Server.Models
{
    public class RSVP
    {
        // RSVPs table (user ID, event ID, status).
        public int UserId { get; set; }
        public int eventId { get; set; }
        public RSVPStatusEnum status { get; set; }

        public User User { get; set; }
        public Event Event { get; set; }
    }
}
