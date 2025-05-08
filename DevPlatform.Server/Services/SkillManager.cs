using DevPlatform.Server.Data;
using DevPlatform.Server.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DevPlatform.Server.Services
{
    public static class SkillManagerProvider
    {
        public static void AddSkillManager(this IServiceCollection services)
        {
            services.AddScoped<SkillManager>();
        }
    }
    public class SkillManager
    {
        private ApplicationContext db;
        public SkillManager(ApplicationContext db) { this.db = db; }
        public async Task<Skill> FindByNameAsync(string name)
        {
            try
            {
                List<Skill> skills = await db.Skills.ToListAsync();
                name = name.ToUpperInvariant();
                foreach (Skill skill in skills)
                {
                    if (skill.NormalizedName == name)
                    {
                        return skill;
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in SkillManager component: {ex.Message}");
                return null;
            }
        }
        public async Task<AppResult<Skill>> CreateSkillAsync(string skillName)
        {
            try
            {
                Skill skill = new Skill
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = skillName,
                    NormalizedName = skillName.ToUpperInvariant()
                };
                await db.AddAsync(skill);
                return AppResult<Skill>.Success(skill);
            }
            catch (Exception ex)
            {
                return AppResult<Skill>.Failure(new IdentityError { Description = $"Exception in SkillManager component: {ex.Message}" });
            }
        }
    }
}
