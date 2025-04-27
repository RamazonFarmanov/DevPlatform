using Microsoft.AspNetCore.Identity;

namespace DevPlatform.Server.Services
{
    public class AppResult<T>
    {
        public IdentityResult Result { get; set; }
        public T? Payload { get; set; }

        public bool Succeeded => Result.Succeeded;

        public static AppResult<T> Success(T payload)
            => new() { Result = IdentityResult.Success, Payload = payload };

        public static AppResult<T> Failure(params IdentityError[] errors)
            => new() { Result = IdentityResult.Failed(errors), Payload = default };
    }
}
