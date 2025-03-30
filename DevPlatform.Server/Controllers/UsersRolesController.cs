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
        [HttpGet("getroles")]
        public IActionResult GetRoles()
        {
            List<RoleViewModel> roles = new List<RoleViewModel>();
            foreach (var role in roleManager.Roles)
            {
                if(role != null)
                {
                    roles.Add(new RoleViewModel
                    {
                        Id = role.Id,
                        Name = role.Name,
                        IsChecked = false
                    });
                }
            }
            return Ok(roles);
        }
        [HttpPost("createrole")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleViewModel model)
        {
            if (ModelState.IsValid) 
            {
                await roleManager.CreateAsync(new IdentityRole(model.Name));
                return Ok();
            }
            return BadRequest(ModelState);
        }
        [HttpPost("deleteroles")]
        public async Task<IActionResult> DeleteRoles([FromBody] List<RoleViewModel> model)
        {
            if (model != null)
            {
                var toDelete = model.Where(u => u.IsChecked).ToList();
                foreach (var role in toDelete) 
                {
                    var exists = await roleManager.FindByIdAsync(role.Id);
                    if (exists != null) 
                    {
                        await roleManager.DeleteAsync(exists);
                    }
                }
                return Ok();
            }
            return BadRequest();
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
