using Server.Models.Enums;

namespace Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public RoleEnum role { get; set; }
    }
}
