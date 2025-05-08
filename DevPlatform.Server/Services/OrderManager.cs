using DevPlatform.Server.Data;
using DevPlatform.Server.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DevPlatform.Server.Services
{
    public static class OrderManagerProvider
    {
        public static void AddOrderManager(this IServiceCollection services)
        {
            services.AddScoped<OrderManager>();
        }
    }
    public class OrderManager
    {
        private ApplicationContext db;
        public OrderManager(ApplicationContext db) 
        {
            this.db = db;
        }
        public async Task<Order> FindByIdAsync(string id)
        {
            try
            {
                var order = await db.Orders.FindAsync(id);
                return order;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in OrderManager component: {ex.Message}");
                return null;
            }
        }
        public async Task<AppResult<Order>> CreateOrderAsync(Order order, User user)
        {
            order.Id = Guid.NewGuid().ToString();
            order.CreatorId = user.Id;
            order.NormalizedTitle = order.Title.ToUpperInvariant();
            order.NormelizedDescription = order.Description.ToUpperInvariant();
            try
            {
                await db.Orders.AddAsync(order);
                await db.SaveChangesAsync();
                return AppResult<Order>.Success(order);
            }
            catch(Exception ex)
            {
                return AppResult<Order>.Failure(new IdentityError { Description = $"Exception in OrderManager component: {ex.Message}" });
            }
        }
        public async Task<AppResult<Order>> UploadFileAsync(Order order, IFormFile file, string path)
        {
            if (file == null || file.Length == 0)
                return AppResult<Order>.Failure(new IdentityError { Description = "No file uploaded." });

            try
            {
                var fileName = $"{order.Id}_{Path.GetFileName(file.FileName)}";
                var _path = Path.Combine(path, fileName);

                using var stream = File.Create(_path);
                await file.CopyToAsync(stream);

                var _order = await db.Orders.FindAsync(order.Id);
                if (_order != null)
                {
                    _order.AttachedFile = _path;
                    await db.SaveChangesAsync();
                    return AppResult<Order>.Success();
                }
                return AppResult<Order>.Failure(new IdentityError { Description = "Failure in OrderManager component, either order wasn't found or something else!" });
            }
            catch (Exception ex)
            {
                return AppResult<Order>.Failure(new IdentityError { Description = $"Exception in OrderManager component: {ex.Message}" });
            }
        }
        public async Task<AppResult<Order>> AddSkillAsync(Order order, Skill skill)
        {
            if (order == null || skill == null)
                return AppResult<Order>.Failure(new IdentityError { Description = "Order or skill is empty" });
            var orderSkill = new OrderSkill
            {
                OrderId = order.Id,
                SkillId = skill.Id
            };
            try
            {
                await db.OrederSkills.AddAsync(orderSkill);
                await db.SaveChangesAsync();
                return AppResult<Order>.Success();
            }
            catch(Exception ex)
            {
                return AppResult<Order>.Failure( new IdentityError { Description = $"Exception in OrderManager component: {ex.Message}" });
            }
        }
    }
}
