using DevPlatform.Server.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DevPlatform.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersRolesController : Controller
    {
        private UserManager<IdentityUser> userManager;
        private RoleManager<IdentityRole> roleManager;
        public UsersRolesController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }
        [HttpGet("getuser")]
        public async Task<IActionResult> UserGet()
        {
            var data = await userManager.FindByEmailAsync("romafarmanov@mail.com");
            UserRoleViewModel user = new UserRoleViewModel();
            if(data != null)
            {
                user.UserId = data.Id;
                user.Name = data.UserName;
                user.Email = data.Email;
                user.UserRoles = await userManager.GetRolesAsync(data);
                user.AllRoles = roleManager.Roles.ToList();
            }
            return Json(user);
        }
    }
}
