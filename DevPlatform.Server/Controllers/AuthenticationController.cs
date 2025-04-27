using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using DevPlatform.Server.Services;
using DevPlatform.Server.ViewModels;
using DevPlatform.Server.Data.Models;

namespace DevPlatform.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly AppUserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        public AuthenticationController(AppUserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return Unauthorized(new { message = "Неправильный логин или пароль" });

            var result = await signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, false);
            if (!result.Succeeded)
                return Unauthorized(new { message = "Неправильный логин или пароль" });

            return Ok(new { message = "Вход выполнен успешно" });
        }
        [HttpPost("createuser")]
        public async Task<IActionResult> SignUp([FromBody] SignUpViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingUser = await userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
                return BadRequest(new { error = new { Email = "This email is already used" } });

            var user = new User { Email = model.Email, UserName = model.Name };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(new { error = "Error ocured during user creation" });

            return Ok(new { message = "User has been created successfully!" });
        }
        [HttpPost("signout")]
        public async Task<IActionResult> SignOut()
        {
            await signInManager.SignOutAsync();
            return Ok(new { message = "Выход выполнен успешно" });
        }

        [HttpGet("getuser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized(new { message = "Пользователь не авторизован" });

            var _user = await userManager.FindByNameAsync(User.Identity.Name);
            if (_user != null)
            {
                var user = new UserRoleViewModel
                {
                    UserId = _user.Id,
                    Email = _user.Email,
                    Name = _user.UserName,
                    AvatarUrl = _user.AvatarUrl,
                    UserRoles = await userManager.GetRolesAsync(_user),
                };
                return Ok(user);
            }
            return NotFound(new { error = "User not found!" });
        }
    }
}
