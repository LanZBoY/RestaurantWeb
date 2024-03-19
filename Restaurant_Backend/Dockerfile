FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env

WORKDIR /App

# Copy
COPY . ./
RUN dotnet restore
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"
ENTRYPOINT [ "bash", "-c","dotnet ef database update -- --environment Docker && dotnet run --environment Docker"]