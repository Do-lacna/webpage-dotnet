using Dolacna.Webpage;
using Serilog;
using Serilog.Formatting.Json;

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
builder.Host.UseSerilog(
    (context, configuration) =>
    {
        configuration.ReadFrom.Configuration(context.Configuration);
        if (context.HostingEnvironment.IsUsetriDevelopment())
        {
            configuration.WriteTo.Console(
                outputTemplate:
                "[{Timestamp:HH:mm:ss} {Level:u3}] [{SourceContext}] {Message:lj}{NewLine}{Exception}");
        }
        else
        {
            configuration.WriteTo.Console(new JsonFormatter(renderMessage: true));
        }
    }, true);

var app = builder.Build();
app.UseCors("AllowAll");
app.UseStaticFiles();
app.MapFallbackToFile("/{*path:nonfile}", "index.html");
app.Run();