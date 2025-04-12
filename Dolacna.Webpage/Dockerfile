FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# Run commands to install node - it is needed to execute npm commands in project's csproj file. Versions for alpine: https://pkgs.alpinelinux.org/packages?branch=edge&repo=&arch=&maintainer=
RUN apk add --update nodejs npm
RUN echo $(node -v && npm -v)

ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Dolacna.Webpage/Dolacna.Webpage.csproj", "Dolacna.Webpage/"]
RUN dotnet restore "Dolacna.Webpage/Dolacna.Webpage.csproj"
COPY . .
WORKDIR "/src/Dolacna.Webpage"
RUN dotnet build "Dolacna.Webpage.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Dolacna.Webpage.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Dolacna.Webpage.dll"]
