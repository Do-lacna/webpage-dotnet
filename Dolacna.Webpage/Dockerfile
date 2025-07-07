FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
# Install node, npm and build tools
RUN apk add --no-cache curl nodejs npm
# Install additional dependencies that may be needed for native modules
RUN apk add --no-cache g++ make python3

ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy project files
COPY ["Dolacna.Webpage/Dolacna.Webpage.csproj", "Dolacna.Webpage/"]
RUN dotnet restore "Dolacna.Webpage/Dolacna.Webpage.csproj"

# Copy the entire source
COPY . .
WORKDIR "/src/Dolacna.Webpage"

# Clean any existing node_modules and lock files completely
RUN rm -rf ClientApps/webpage/node_modules ClientApps/webpage/package-lock.json ClientApps/webpage/yarn.lock

# Install dependencies with proper npm configuration
WORKDIR "/src/Dolacna.Webpage/ClientApps/webpage"
# Set environment variables to help with npm issues
ENV DOCKER_BUILD=true
ENV NODE_ENV=development
# Force npm to install all dependencies including missing native bindings
RUN npm install --no-package-lock --legacy-peer-deps --force
# Install missing native bindings explicitly
RUN npm install @swc/core-linux-x64-gnu @rollup/rollup-linux-x64-gnu --save-dev --force

# Build the React app manually
RUN npm run build:dev

# Go back to main project directory
WORKDIR "/src/Dolacna.Webpage"

# Build the .NET project (npm tasks will be skipped since we already built the React app)
RUN dotnet build "Dolacna.Webpage.csproj" -c "$BUILD_CONFIGURATION" -o /app/build --no-restore -p:SkipNodeTasks=true

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Dolacna.Webpage.csproj" \
    -c "$BUILD_CONFIGURATION" \
    -o /app/publish \
    /p:UseAppHost=false \
    -p:SkipNodeTasks=true

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Dolacna.Webpage.dll"]
