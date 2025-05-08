namespace DevPlatform.Server.Data.Models
{
    public enum Status
    {
        New,
        InProcess,
        Finished
    }
    public enum PriceType
    {
        Fixed,
        Negotiable
    }
    public enum TermType
    {
        Negotiable,
        Deadline,
        Duration
    }
    public enum TimeUnit
    {
        Hour,
        Day,
        Week,
        Month,
        Year
    }
    public class Order
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string NormalizedTitle { get; set; }
        public string Description { get; set; }
        public string NormelizedDescription { get; set; }
        public string? AttachedFile { get; set; }
        public PriceType PriceType { get; set; }
        public decimal? PriceVal { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public TermType TermType { get; set; }
        public DateTime? Deadline { get; set; }
        public int? Duration { get; set; }
        public TimeUnit? TimeUnit { get; set; }
        public Status Status { get; set; } = Status.New;
        public string CreatorId { get; set; }
        public User Creator { get; set; }
        public string? DeveloperId { get; set; }
        public User? Developer { get; set; }
    }
}
