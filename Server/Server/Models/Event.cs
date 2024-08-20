using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTime date { get; set; }
        public string location { get; set; }
        [ForeignKey("Id")]
        public int userId { get; set; }
        public User user { get; set; }
        public int maximumCapacity { get; set; }
    }
}
