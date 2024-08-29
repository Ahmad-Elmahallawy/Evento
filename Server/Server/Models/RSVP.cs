using Server.Models.Enums;

namespace Server.Models
{
    public class RSVP
    {
        public string UserId { get; set; }
        public int eventId { get; set; }
        public RSVPStatusEnum status { get; set; }
        public Event Event { get; set; }
    }
}
