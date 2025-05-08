using System.ComponentModel.DataAnnotations;
using DevPlatform.Server.Data.Models;

namespace DevPlatform.Server.ViewModels
{
    public class OrderModelView
    {
        public string? Id { get; set; }
        [Required]
        [Length(10, 200)]
        public string Title { get; set; }
        [Required]
        [Length(10, 10000)]
        public string Description { get; set; }
        public IFormFile? AttachedFile { get; set; }
        public List<string>? Skills { get; set; }
        [Required]
        public PriceType PriceType { get; set; }
        public decimal? PriceVal { get; set; }
        [Required]
        public TermType TermType { get; set; }
        public DateTime? Deadline { get; set; }
        public int? Duration { get; set; }
        public TimeUnit? TimeUnit { get; set; }
    }
}
