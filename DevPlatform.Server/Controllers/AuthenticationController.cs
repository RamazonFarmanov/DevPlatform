using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using DevPlatform.Server.ViewModels;

namespace DevPlatform.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        public AuthenticationController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
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
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingUser = await userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
                return BadRequest(new { message = "Этот email уже используется" });

            var user = new IdentityUser { Email = model.Email, UserName = model.Name };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await signInManager.SignInAsync(user, false); // Устанавливаем куки
            return Ok(new { message = "Регистрация успешна" });
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
            UserRoleViewModel user = new UserRoleViewModel { UserId = "smth", Email = "smth", Name = "smth" };
            if (_user != null)
            {
                user.UserId = _user.Id;
                user.Email = _user.Email;
                user.Name = _user.UserName;
            }
            return Ok(user);
        }
    }
}
