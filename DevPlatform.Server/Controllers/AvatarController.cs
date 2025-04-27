using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using DevPlatform.Server.Data.Models;
using DevPlatform.Server.Services;

namespace DevPlatform.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvatarController : Controller
    {
        private readonly IWebHostEnvironment env;
        private readonly AppUserManager<User> userManager;

        public AvatarController(IWebHostEnvironment _env, AppUserManager<User> _userManager)
        {
            env = _env;
            userManager = _userManager;
        }
        [HttpPost("upload")]
        public async Task<IActionResult> UploadAvatarId([FromForm] IFormFile file)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null) return NotFound();

            var path = Path.Combine(env.WebRootPath, "avatars");
            var result = await userManager.UploadAvatarAsync(user, file, path);

            if (result.Succeeded)
            {
                return Ok(new { url = user.AvatarUrl });
            }

            return BadRequest(result.Errors);
        }
        [HttpPost("uploadbyid")]
        public async Task<IActionResult> UploadAvatarAuth([FromForm] IFormFile file, [FromForm] string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            var path = Path.Combine(env.WebRootPath, "avatars");
            var result = await userManager.UploadAvatarAsync(user, file, path);

            if (result.Succeeded)
            {
                return Ok(new { messageAvatar = "Avatar has benn changed successfully!" });
            }

            return BadRequest(result.Errors);
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAvatar(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null || string.IsNullOrEmpty(user.AvatarUrl))
                return NotFound();

            var path = Path.Combine(env.WebRootPath, user.AvatarUrl.TrimStart('/'));

            if (!System.IO.File.Exists(path))
                return NotFound();

            var bytes = await System.IO.File.ReadAllBytesAsync(path);
            return File(bytes, "image/png"); // или "image/png"
        }
    }
}
