using System.Text.Json.Nodes;

namespace Dolacna.Webpage;

// BFF proxy: hides the upstream catalog API host/shape from the browser.
public static class CatalogProxyEndpoints
{
    // Public preview only needs an approximate price, not the exact competitive figure.
    private static readonly string[] ShopPriceFields =
        ["price", "normalized_price", "actual_price", "normalized_actual_price"];

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
            if (upstreamResponse.IsSuccessStatusCode)
            {
                body = TruncateProductPrices(body);
            }
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

    private static string TruncateProductPrices(string json)
    {
        var root = JsonNode.Parse(json)?.AsObject();
        if (root?["products"] is not JsonArray products)
        {
            return json;
        }

        foreach (var product in products)
        {
            if (product?["shops_prices"] is not JsonArray shopsPrices)
            {
                continue;
            }

            foreach (var shopPrice in shopsPrices)
            {
                if (shopPrice is not JsonObject shopPriceObject)
                {
                    continue;
                }

                TruncatePriceFields(shopPriceObject, ShopPriceFields);
                if (shopPriceObject["discount_price"] is JsonObject discountPrice)
                {
                    TruncatePriceFields(discountPrice, ["price"]);
                }
            }
        }

        return root.ToJsonString();
    }

    private static void TruncatePriceFields(JsonObject target, string[] fields)
    {
        foreach (var field in fields)
        {
            // Floor (not round) to the nearest 10 cents so the exact figure isn't recoverable.
            if (target[field] is JsonValue value && value.TryGetValue(out decimal price))
            {
                target[field] = Math.Floor(price * 10m) / 10m;
            }
        }
    }
}
