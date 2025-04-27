using Microsoft.AspNetCore.Identity;

namespace DevPlatform.Server.ViewModels
{
    public class UserRoleViewModel
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string AvatarUrl { get; set; }
        public bool IsChecked { get; set; }
        public List<IdentityRole> AllRoles { get; set; }
        public IList<string> UserRoles { get; set; }
    }
}
