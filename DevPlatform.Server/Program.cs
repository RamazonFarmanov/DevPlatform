using DevPlatform.Server.Data;
using DevPlatform.Server.Data.Models;
using DevPlatform.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews()
                .AddJsonOptions(options =>
                 {
                     options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                 });
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5057);
    options.ListenAnyIP(7228, listenOptions => listenOptions.UseHttps());
});
builder.Services.AddDbContext<ApplicationContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<ApplicationContext>();
builder.Services.AddAppUserManager();
builder.Services.AddOrderManager();
builder.Services.AddSkillManager();

//Cookies configuration
builder.Services.ConfigureApplicationCookie(options =>
{
    /*options.LoginPath = "/Authentication/SignIn"; // Путь к странице входа
    options.AccessDeniedPath = "/Authentication/AccessDenied"; // Путь к странице отказа в доступе
    options.Cookie.HttpOnly = true; // Защита куки от доступа через JavaScript
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Только HTTPS (в продакшене)
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60); // Куки живут 60 минут
    options.SlidingExpiration = true; // Если пользователь активен, срок действия куки продлевается*/
    options.Cookie.HttpOnly = true; // Защита от XSS
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Работает только по HTTPS
    options.Cookie.SameSite = SameSiteMode.None; // Нужно для CORS, если фронт на другом домене
    options.ExpireTimeSpan = TimeSpan.FromMinutes(1440);
    options.SlidingExpiration = true;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("https://localhost:58604") // Адрес фронта
               .AllowCredentials()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
    options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
    options.DefaultSignInScheme = IdentityConstants.ApplicationScheme;
}).AddCookie();

var app = builder.Build();

app.UseStaticFiles();
app.UseCors("AllowReactApp");
app.UseDefaultFiles();
app.MapStaticAssets();
app.UseAuthorization();
app.UseAuthentication();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.Run();
