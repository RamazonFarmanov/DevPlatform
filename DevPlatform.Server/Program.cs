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
    /*options.LoginPath = "/Authentication/SignIn"; // ���� � �������� �����
    options.AccessDeniedPath = "/Authentication/AccessDenied"; // ���� � �������� ������ � �������
    options.Cookie.HttpOnly = true; // ������ ���� �� ������� ����� JavaScript
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // ������ HTTPS (� ����������)
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60); // ���� ����� 60 �����
    options.SlidingExpiration = true; // ���� ������������ �������, ���� �������� ���� ������������*/
    options.Cookie.HttpOnly = true; // ������ �� XSS
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // �������� ������ �� HTTPS
    options.Cookie.SameSite = SameSiteMode.None; // ����� ��� CORS, ���� ����� �� ������ ������
    options.ExpireTimeSpan = TimeSpan.FromMinutes(1440);
    options.SlidingExpiration = true;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("https://localhost:58604") // ����� ������
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
