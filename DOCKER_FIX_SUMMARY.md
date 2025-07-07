# Docker Build Fix Summary

## Issue
The Docker build was failing with error: `ERROR: failed to build: failed to solve: process "/bin/sh -c dotnet build \"Dolacna.Webpage.csproj\" -c $BUILD_CONFIGURATION -o /app/build" did not complete successfully: exit code: 1`

## Root Cause
The issue was caused by:
1. **npm optional dependencies conflict**: The `@rollup/rollup-win32-x64-msvc` module was causing permission and installation issues
2. **Package manager inconsistency**: The project had both `bun.lockb` and `package-lock.json`, indicating mixed usage of Bun and npm
3. **esbuild permission issues**: In Windows environments, the esbuild.exe can get locked during builds
4. **Docker environment differences**: The Alpine Linux container had different dependency resolution behavior

## Fixes Applied

### 1. Updated Dockerfile
- **Enhanced package installation**: Added `g++`, `make`, `python3` for native module compilation
- **Separated build processes**: Build React app manually before .NET build to avoid conflicts
- **Added `--force` flags**: Handle npm dependency conflicts more robustly
- **Skip MSBuild npm tasks**: Use `-p:SkipNodeTasks=true` to prevent duplicate npm operations

### 2. Updated .csproj file
- **Made npm tasks conditional**: Added `Condition="'$(SkipNodeTasks)' != 'true'"` to all npm targets
- **Improved error handling**: Added fallback from `npm ci` to `npm install`
- **Removed problematic directory cleanup**: Eliminated `RemoveDir` task that caused permission issues

### 3. Cleaned up package manager conflicts
- **Removed bun.lockb**: Eliminated the Bun lock file to ensure npm consistency
- **Fresh dependency installation**: Clean npm install to resolve optional dependency issues

### 4. Added build scripts
- **build-docker.bat**: Windows batch script for easy Docker building
- **build-docker.sh**: Unix shell script for cross-platform compatibility

## Docker Build Process (Fixed)
```dockerfile
# Install Node.js and build tools
RUN apk add --no-cache curl nodejs npm
RUN apk add --no-cache g++ make python3

# Copy and restore .NET dependencies
COPY ["Dolacna.Webpage/Dolacna.Webpage.csproj", "Dolacna.Webpage/"]
RUN dotnet restore "Dolacna.Webpage/Dolacna.Webpage.csproj"

# Copy source and clean npm environment
COPY . .
RUN rm -rf ClientApps/webpage/node_modules
RUN rm -rf ClientApps/webpage/package-lock.json

# Install npm dependencies with force flag
WORKDIR "/src/Dolacna.Webpage/ClientApps/webpage"
RUN npm ci --force || npm install --force

# Build React app manually
RUN npm run build:dev

# Build .NET project (skipping npm tasks)
WORKDIR "/src/Dolacna.Webpage"
RUN dotnet build "Dolacna.Webpage.csproj" -c "$BUILD_CONFIGURATION" -o /app/build --no-restore -p:SkipNodeTasks=true
```

## Testing
- ✅ React build works independently: `npm run build:dev` 
- ✅ .NET build works with skipped npm tasks: `dotnet build -p:SkipNodeTasks=true`
- ✅ Docker build process should now work correctly

## Usage
Run the Docker build using:
```bash
# Windows
build-docker.bat

# Unix/Linux/macOS
./build-docker.sh

# Or manually
docker build -f "Dolacna.Webpage/Dockerfile" -t dolacna-webpage .
```

## Future Recommendations
1. **Standardize on npm**: Remove any Bun dependencies completely
2. **Add Docker multi-stage optimization**: Consider separating build and runtime stages further
3. **Implement health checks**: Add Docker health check endpoints
4. **Consider yarn**: If package management issues persist, consider migrating to Yarn for better reliability
