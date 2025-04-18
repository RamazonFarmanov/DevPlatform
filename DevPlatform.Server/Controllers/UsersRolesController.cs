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
                if (role != null)
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
        [HttpPost("editroles")]
        public async Task<IActionResult> EditRoles([FromBody] EditRolesViewModel model)
        {
            var user = await userManager.FindByIdAsync(model.Id);
            if (user != null) 
            {
                var userRoles = await userManager.GetRolesAsync(user);
                var addedRoles = model.UserRoles.Except(userRoles);
                var removedRoles = userRoles.Except(model.UserRoles);
                await userManager.AddToRolesAsync(user, addedRoles);
                await userManager.RemoveFromRolesAsync(user, removedRoles);
                return Ok(new { message = "Roles have been edited successfully!" });
            }
            return NotFound(new { error = "User not found!" });
        }
        [HttpGet("getusers")]
        public async Task<IActionResult> GetUsers()
        {
            List<UserRoleViewModel> users = new List<UserRoleViewModel>();
            foreach (var user in userManager.Users.ToList())
            {
                if (user != null)
                {
                    var roles = await userManager.GetRolesAsync(user);
                    users.Add(new UserRoleViewModel
                    {
                        UserId = user.Id,
                        Name = user.UserName,
                        Email = user.Email,
                        IsChecked = false,
                        AllRoles = roleManager.Roles.ToList(),
                        UserRoles = roles
                    });
                }
            }
            return Ok(users);
        }
        [HttpGet("getuser/{id}")]
        public async Task<IActionResult> GetUser([FromRoute] string id)
        {
            var _user = await userManager.FindByIdAsync(id);
            if (_user != null)
            {
                var roles = await userManager.GetRolesAsync(_user);
                return Ok(new UserRoleViewModel
                {
                    UserId = _user.Id,
                    Name = _user.UserName,
                    Email = _user.Email,
                    IsChecked = false,
                    UserRoles = roles
                });
            }
            return NotFound(new { message = "User not found!" });
        }
        [HttpPost("createuser")]
        public async Task<IActionResult> CreateUser([FromBody] SignUpViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var _user = await userManager.FindByEmailAsync(model.Email);
            if (_user != null)
                return BadRequest(new { error = new { Email = "This email is already used" } });
            IdentityUser user = new IdentityUser
            {
                Email = model.Email,
                UserName = model.Name
            };
            var result = await userManager.CreateAsync(user);
            if (result.Succeeded)
                return Ok(new { message = "User has been created successfully!" });
            return BadRequest(new { message = "Error ocured during user creation" });
        }
        [HttpPost("edituser")]
        public async Task<IActionResult> EditUser([FromBody] EditUserViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await userManager.FindByIdAsync(model.UserId);
            if (user != null)
            {
                user.Email = model.Email;
                user.UserName = model.UserName;
                var result = await userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return Ok(new { messageData = "User has been updated successfully!" });
                }
                else
                {
                    return BadRequest(new { errorData = "Error ocured during user edition" });
                }
            }
            return NotFound(new { errorData = "User not found!" });
        }
        [HttpPost("deleteusers")]
        public async Task<IActionResult> DeleteUsers([FromBody] List<UserRoleViewModel> model)
        {
            if (model != null)
            {
                var toDelete = model.Where(u => u.IsChecked).ToList();
                foreach (var item in toDelete)
                {
                    var isExists = await userManager.FindByIdAsync(item.UserId);
                    if (isExists != null)
                    {
                        await userManager.DeleteAsync(isExists);
                    }
                }
                return Ok();
            }
            return BadRequest(new { error = "No data to delete!" });
        }
        [HttpPost("changepass")]
        public async Task<IActionResult> ChangePassword([FromBody] EditUserViewModel model)
        {
            var user = await userManager.FindByIdAsync(model.UserId);
            if (user != null)
            {
                var passwordValidator = HttpContext.RequestServices.GetService(typeof(IPasswordValidator<IdentityUser>)) as IPasswordValidator<IdentityUser>;
                var passwordHasher = HttpContext.RequestServices.GetService(typeof(IPasswordHasher<IdentityUser>)) as IPasswordHasher<IdentityUser>;
                var result = await passwordValidator.ValidateAsync(userManager, user, model.Password);
                if (result.Succeeded)
                {
                    user.PasswordHash = passwordHasher.HashPassword(user, model.Password);
                    await userManager.UpdateAsync(user);
                    return Ok(new { messagePassword = "Password has been changed successfully!" });
                }
                else
                {
                    return BadRequest(new { errorsPassword = result.Errors });
                }
            }
            return NotFound(new { errorPassword = "User not found!" });
        }
    }
}
