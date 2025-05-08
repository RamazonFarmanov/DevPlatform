namespace DevPlatform.Server.Data.Models
{
    public class OrderSkill
    {
        public string OrderId { get; set; }
        public Order Order { get; set; }
        public string SkillId { get; set; }
        public Skill Skill { get; set; }
    }
}
