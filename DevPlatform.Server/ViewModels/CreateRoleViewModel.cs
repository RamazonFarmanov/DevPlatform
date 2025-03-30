using System.ComponentModel.DataAnnotations;

namespace DevPlatform.Server.ViewModels
{
    public class CreateRoleViewModel
    {
        [Required]
        public string Name { get; set; }
    }
}
