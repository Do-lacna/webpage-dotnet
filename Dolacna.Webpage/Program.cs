var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();
app.UseCors("AllowAll");
app.UseStaticFiles(); // TODO 00 needed ? 
app.MapFallbackToFile("/webpage/{*path:nonfile}", "webpage/index.html");
app.Run();