using System.ComponentModel.DataAnnotations;

namespace DevPlatform.Server.ViewModels
{
    public class SignInViewModel
    {
        [Required(ErrorMessage = "Email is required!")]
        [Display(Name = "Email")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required!")]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Display(Name = "Remember me")]
        public bool RememberMe { get; set; } = false;
    }
}
