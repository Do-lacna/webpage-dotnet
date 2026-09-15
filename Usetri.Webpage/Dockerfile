FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
# Run commands to install node - it is needed to execute npm commands in project's csproj file. Versions for alpine: https://pkgs.alpinelinux.org/packages?branch=edge&repo=&arch=&maintainer=
RUN apk add --update nodejs npm
RUN echo $(node -v && npm -v)

ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Usetri.Webpage/Usetri.Webpage.csproj", "Usetri.Webpage/"]
RUN dotnet restore "Usetri.Webpage/Usetri.Webpage.csproj"
COPY . .
WORKDIR "/src/Usetri.Webpage"
RUN dotnet build "Usetri.Webpage.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Usetri.Webpage.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Usetri.Webpage.dll"]
