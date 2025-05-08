using DevPlatform.Server.Data.Models;
using DevPlatform.Server.Services;
using DevPlatform.Server.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DevPlatform.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private AppUserManager<User> userManager;
        private OrderManager orderManager;
        private SkillManager skillManager;
        private IWebHostEnvironment env;
        public OrdersController(AppUserManager<User> userManager, OrderManager orderManager, SkillManager skillManager, IWebHostEnvironment env)
        {
            this.userManager = userManager;
            this.orderManager = orderManager;
            this.skillManager = skillManager;
            this.env = env;
        }
        [HttpPost("createorder")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderModelView model)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.GetUserAsync(User);
                if (user == null) 
                    return Unauthorized();
                Order order = new Order
                {
                    Title = model.Title,
                    Description = model.Description,
                    PriceType = model.PriceType,
                    PriceVal = model.PriceVal,
                    TermType = model.TermType,
                    Deadline = model.Deadline,
                    Duration = model.Duration,
                    TimeUnit = model.TimeUnit,
                    CreatorId = user.Id
                };
                var createResult = await orderManager.CreateOrderAsync(order, user);
                if (createResult.Succeeded)
                {
                    return Ok(new { id = createResult.Payload.Id });
                }
                return BadRequest(createResult.Errors);
            }
            return BadRequest(ModelState);
        }
        [HttpPost("addskills/{id}")]
        public async Task<IActionResult> AddSkills([FromForm] List<string> skills, [FromRoute] string id)
        {
            if (id == null || skills == null)
                return BadRequest(new { error = "Arguments are invalid!" });
            var order = await orderManager.FindByIdAsync(id);
            if (order == null) 
                return NotFound(new { error = "Inexisted id!" });
            foreach (var skill in skills)
            {
                var exists = await skillManager.FindByNameAsync(skill);
                AppResult<Order> result;
                if (exists == null)
                {
                    var rSkill = await skillManager.CreateSkillAsync(skill);
                    if (!rSkill.Succeeded) 
                        return StatusCode(500, rSkill.Errors);
                    result = await orderManager.AddSkillAsync(order, rSkill.Payload);
                }
                else
                {
                    result = await orderManager.AddSkillAsync(order, exists);
                }
            }
            return Ok(new { message = "Skills has been added successfully!" });
        }
    }
}
