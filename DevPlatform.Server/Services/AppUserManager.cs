using DevPlatform.Server.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DevPlatform.Server.Services
{
    public static class AppUserManagerProvider
    {
        public static void AddAppUserManager(this IServiceCollection services)
        {
            services.AddScoped(typeof(AppUserManager<>));
        }
    }
    public class AppUserManager<TUser> : UserManager<TUser> where TUser : IdentityUser, IUserExtension
    {
        private readonly IWebHostEnvironment _env;

        public AppUserManager(
            IUserStore<TUser> store,
            IOptions<IdentityOptions> optionsAccessor,
            IPasswordHasher<TUser> passwordHasher,
            IEnumerable<IUserValidator<TUser>> userValidators,
            IEnumerable<IPasswordValidator<TUser>> passwordValidators,
            ILookupNormalizer keyNormalizer,
            IdentityErrorDescriber errors,
            IServiceProvider services,
            ILogger<UserManager<TUser>> logger,
            IWebHostEnvironment env)
            : base(store, optionsAccessor, passwordHasher, userValidators,
                   passwordValidators, keyNormalizer, errors, services, logger)
        {
            _env = env;
        }

        public async Task<IdentityResult> UploadAvatarAsync(TUser user, IFormFile file, string path)
        {
            if (file == null || file.Length == 0)
                return IdentityResult.Failed(new IdentityError { Description = "No file uploaded." });

            try
            {
                var fileName = $"{user.Id}_{Path.GetFileName(file.FileName)}";
                var _path = Path.Combine(path, fileName);

                using var stream = File.Create(_path);
                await file.CopyToAsync(stream);

                if (user is IUserExtension avatarUser)
                {
                    avatarUser.AvatarUrl = _path;
                    return await UpdateAsync(user);
                }

                return IdentityResult.Failed(new IdentityError { Description = "User doesn't support avatars." });
            }
            catch (Exception ex)
            {
                return IdentityResult.Failed(new IdentityError { Description = $"Exception: {ex.Message}" });
            }
        }
    }

}
