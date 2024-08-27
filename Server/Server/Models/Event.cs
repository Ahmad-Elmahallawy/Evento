namespace Server.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTime date { get; set; }
        public string location { get; set; }
        public string userId { get; set; }
        public int currentCapacity { get; set; }
        public int maximumCapacity { get; set; }
    }
}
