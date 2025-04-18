using System.ComponentModel.DataAnnotations;

namespace DevPlatform.Server.ViewModels
{
    public class EditUserViewModel
    {
        [Required]
        [Display(Name = "Id")]
        public string UserId { get; set; }
        [Required]
        [Display(Name = "Name")]
        public string UserName { get; set; }
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}
