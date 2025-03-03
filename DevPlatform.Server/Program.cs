var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5057);
    options.ListenAnyIP(7228, listenOptions => listenOptions.UseHttps());
});
/*builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", 
        builder =>
        {
            builder.WithOrigins("https://localhost:443");
        }));*/

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

/*app.UseCors("CorsPolicy");*/
app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.MapFallbackToFile("/index.html");

app.Run();
