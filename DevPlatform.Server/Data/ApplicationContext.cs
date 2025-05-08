using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using DevPlatform.Server.Data.Models;
namespace DevPlatform.Server.Data
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<OrderSkill> OrederSkills { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Добавление уникального индекса на Email
            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            builder.Entity<Skill>()
                .HasAlternateKey(s => s.Name);
            builder.Entity<OrderSkill>()
                .HasNoKey();
        }
    }
}