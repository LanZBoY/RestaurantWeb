using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Restaurant.Models;
using Restaurant.Settings;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Add JWTAuthentication
JwtSetting? jwtSetting = builder.Configuration.GetSection("JwtSetting").Get<JwtSetting>();
if (jwtSetting != null){

    builder.Services.AddAuthentication((opt) => {
        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer((opt) => {
        opt.TokenValidationParameters = new TokenValidationParameters{
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSetting.Secret)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

    builder.Services.AddAuthorization((opt) =>{
        opt.AddPolicy("User", new AuthorizationPolicyBuilder()
        .RequireRole("User")
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .Build());
        opt.AddPolicy("Admin", new AuthorizationPolicyBuilder()
        .RequireRole("Admin")
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .Build());
        opt.AddPolicy("All", new AuthorizationPolicyBuilder()
        .RequireRole(["User", "Admin"])
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .Build());
    });
}

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen((opt) => {
    opt.SwaggerDoc("v1", new OpenApiInfo{
        Version = "1.0",
        Title = "餐廳API",
    });
    // opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme{
    //     Name = "Auhorization",
    //     Type = SecuritySchemeType.Http,
    //     In = 
    // });
});
builder.Services.AddDbContext<UserContext>(opt =>{
    // 使用PostgreSql
    opt.UseNpgsql(connectionString: builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();

app.Run();
