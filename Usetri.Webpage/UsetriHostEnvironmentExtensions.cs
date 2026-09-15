namespace Usetri.Webpage;

public static class UsetriHostEnvironmentExtensions
{
    public static bool IsUsetriDevelopment(this IHostEnvironment hostEnvironment)
    {
        return hostEnvironment.IsEnvironment(Environments.Development) || hostEnvironment.IsEnvironment("Azure-Development");
    }
}
