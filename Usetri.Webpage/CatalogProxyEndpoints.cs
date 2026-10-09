namespace Usetri.Webpage;

// BFF proxy: hides the upstream catalog API host/shape from the browser.
public static class CatalogProxyEndpoints
{
    public static IServiceCollection AddCatalogProxy(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHttpClient("CatalogApi", client =>
        {
            client.BaseAddress = new Uri(configuration["Catalog:BaseUrl"]!);
        });
        services.AddOutputCache(options =>
        {
            options.AddPolicy("Categories", p => p.Expire(TimeSpan.FromMinutes(10)));
            options.AddPolicy("CategoryPrices", p => p.Expire(TimeSpan.FromSeconds(30)));
        });

        return services;
    }

    public static IEndpointRouteBuilder MapCatalogProxy(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/categories", async (HttpRequest request, IHttpClientFactory httpClientFactory) =>
        {
            var client = httpClientFactory.CreateClient("CatalogApi");
            using var upstreamResponse = await client.GetAsync($"/public/categories{request.QueryString}");
            var body = await upstreamResponse.Content.ReadAsStringAsync();
            return Results.Content(body, "application/json", statusCode: (int)upstreamResponse.StatusCode);
        }).CacheOutput("Categories");

        endpoints.MapGet("/api/categories/{categoryId:int}/prices", async (int categoryId, HttpRequest request, IHttpClientFactory httpClientFactory) =>
        {
            var client = httpClientFactory.CreateClient("CatalogApi");
            using var upstreamResponse = await client.GetAsync($"/public/categories/{categoryId}/prices{request.QueryString}");
            var body = await upstreamResponse.Content.ReadAsStringAsync();
            return Results.Content(body, "application/json", statusCode: (int)upstreamResponse.StatusCode);
        }).CacheOutput("CategoryPrices");

        return endpoints;
    }
}
