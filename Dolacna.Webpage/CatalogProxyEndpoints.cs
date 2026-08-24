namespace Dolacna.Webpage;

// BFF proxy: hides the upstream catalog API host/shape from the browser.
public static class CatalogProxyEndpoints
{
    public static IServiceCollection AddCatalogProxy(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpClient("CatalogApi", client =>
        {
            client.BaseAddress = new Uri(configuration["Catalog:BaseUrl"]!);
        });
        services.AddHttpClient("CatalogImages", client =>
        {
            client.BaseAddress = new Uri(configuration["Catalog:ImageBaseUrl"]!);
        });
        services.AddOutputCache(options =>
        {
            options.AddPolicy("Categories", p => p.Expire(TimeSpan.FromMinutes(10)));
            options.AddPolicy("Products", p => p.Expire(TimeSpan.FromSeconds(30)));
            options.AddPolicy("CategoryImages", p => p.Expire(TimeSpan.FromHours(24)));
        });

        return services;
    }

    public static IEndpointRouteBuilder MapCatalogProxy(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/categories", async (HttpRequest request, IHttpClientFactory httpClientFactory) =>
        {
            var client = httpClientFactory.CreateClient("CatalogApi");
            using var upstreamResponse = await client.GetAsync($"/categories{request.QueryString}");
            var body = await upstreamResponse.Content.ReadAsStringAsync();
            return Results.Content(body, "application/json", statusCode: (int)upstreamResponse.StatusCode);
        }).CacheOutput("Categories");

        endpoints.MapGet("/api/products", async (HttpRequest request, IHttpClientFactory httpClientFactory) =>
        {
            var client = httpClientFactory.CreateClient("CatalogApi");
            using var upstreamResponse = await client.GetAsync($"/products{request.QueryString}");
            var body = await upstreamResponse.Content.ReadAsStringAsync();
            return Results.Content(body, "application/json", statusCode: (int)upstreamResponse.StatusCode);
        }).CacheOutput("Products");

        endpoints.MapGet("/api/categories/{id:int}/image", async (int id, IHttpClientFactory httpClientFactory) =>
        {
            var client = httpClientFactory.CreateClient("CatalogImages");
            using var upstreamResponse = await client.GetAsync($"/images/categories/{id}.jpg");
            if (!upstreamResponse.IsSuccessStatusCode)
            {
                return Results.NotFound();
            }
            var bytes = await upstreamResponse.Content.ReadAsByteArrayAsync();
            return Results.File(bytes, "image/jpeg");
        }).CacheOutput("CategoryImages");

        return endpoints;
    }
}
