using Usetri.Webpage;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Net.Http.Headers;
using System.IO.Compression;
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

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
    options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[]
    {
        "application/javascript",
        "text/javascript",
        "text/css",
        "application/json",
        "image/svg+xml",
        "font/woff2",
        "application/manifest+json",
    });
});
builder.Services.Configure<BrotliCompressionProviderOptions>(o => o.Level = CompressionLevel.Optimal);
builder.Services.Configure<GzipCompressionProviderOptions>(o => o.Level = CompressionLevel.Optimal);

builder.Services.AddCatalogProxy(builder.Configuration);

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
app.UseResponseCompression();
app.UseCors("AllowAll");
app.UseOutputCache();

app.MapCatalogProxy();

app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        // Content-hashed build assets and immutable media can be cached for a year.
        var path = ctx.Context.Request.Path;
        var name = ctx.File.Name;
        var cacheable = path.StartsWithSegments("/assets")
            || name.EndsWith(".woff2", StringComparison.OrdinalIgnoreCase)
            || name.EndsWith(".woff", StringComparison.OrdinalIgnoreCase)
            || name.EndsWith(".webp", StringComparison.OrdinalIgnoreCase)
            || name.EndsWith(".png", StringComparison.OrdinalIgnoreCase)
            || name.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
            || name.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
            || name.EndsWith(".svg", StringComparison.OrdinalIgnoreCase);

        if (cacheable && !name.Equals("index.html", StringComparison.OrdinalIgnoreCase))
        {
            ctx.Context.Response.Headers[HeaderNames.CacheControl] =
                "public,max-age=31536000,immutable";
        }
    }
});
// Apple and Google fetch these two files to confirm that this domain vouches
// for the Usetri mobile app, which is what lets a shared shopping list link
// (https://usetrislovensko.sk/share/{token}) open the app instead of the site.
//
// They get their own provider rather than living in wwwroot, because the SPA
// build empties that directory, the static file provider skips dot-prefixed
// directories like `.well-known`, and `apple-app-site-association` carries no
// extension — so the SPA fallback below would answer it with index.html.
// They are served as explicit endpoints rather than static files: the SPA
// fallback below matches any extension-less path, including
// /.well-known/apple-app-site-association, and once routing has picked an
// endpoint the static file middleware stands down — which is exactly how that
// file ended up being answered with index.html. A concrete route outranks the
// catch-all, so these two win. Both must be served as JSON, or Apple and
// Google ignore them.
var wellKnownDirectory = Path.Combine(app.Environment.ContentRootPath, "well-known");

IResult ServeWellKnownFile(string fileName)
{
    var filePath = Path.Combine(wellKnownDirectory, fileName);
    return File.Exists(filePath)
        ? Results.File(filePath, "application/json")
        : Results.NotFound();
}

app.MapGet("/.well-known/apple-app-site-association",
    () => ServeWellKnownFile("apple-app-site-association"));
app.MapGet("/.well-known/assetlinks.json",
    () => ServeWellKnownFile("assetlinks.json"));

app.MapFallbackToFile("/{*path:nonfile}", "index.html");
app.Run();