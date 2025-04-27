using Microsoft.AspNetCore.Identity;
namespace DevPlatform.Server.Data.Models
{
    public interface IUserExtension
    {
        string? AvatarUrl { get; set; }
    }
    public class User : IdentityUser, IUserExtension
    {
        public string? AvatarUrl { get; set; }
    }
}
