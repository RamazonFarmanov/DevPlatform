using Microsoft.AspNetCore.Identity;

namespace DevPlatform.Server.Services
{
    public class AppResult<T>
    {
        public static AppResult<T> success = new AppResult<T> { Succeeded = true };
        public List<IdentityError> errors = new List<IdentityError>();
        public bool Succeeded { get; set; }
        public T? Payload { get; set; }
        public IEnumerable<IdentityError> Errors => errors;
        public static AppResult<T> Success()
        {
            var result = new AppResult<T> { Succeeded = true };
            return result;
        }
        public static AppResult<T> Success(T payload)
        {
            var result = new AppResult<T> { Succeeded = true, Payload = payload };
            return result;
        }
        public static AppResult<T> Failure(params IdentityError[] errors)
        {
            var result = new AppResult<T> { Succeeded = false };
            if (errors != null)
            {
                result.errors.AddRange(errors);
            }
            return result;
        }
    }
}
