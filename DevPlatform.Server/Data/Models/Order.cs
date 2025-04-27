namespace DevPlatform.Server.Data.Models
{
    public enum Status
    {
        New,
        InProcess,
        Finished
    }
    public class Order
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string? AttachedFile { get; set; }
        public decimal? Price { get; set; }
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? Deadline { get; set; }
        public Status Status { get; set; } = Status.New;
        public User Creator { get; set; }
        public User? Developer { get; set; }
    }
}
