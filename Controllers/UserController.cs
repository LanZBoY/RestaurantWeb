using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Restaurant.Models;
using Restaurant.Settings;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(UserContext userContext, IConfiguration configuration) : ControllerBase{
    private readonly UserContext _context = userContext;
    // 透過Dependency Injection的方式取得Configuration
    private readonly IConfiguration _configuration = configuration;
    [HttpPost("Login")]
    public ActionResult Login(LoginViewUser user){
        // 資料庫搜尋邏輯
        User? findResult = _context.Users.Where((item) => (item.UserName == user.UserName) & (item.Password == user.Password)).FirstOrDefault();
        if (findResult == null) return Unauthorized();

        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var jwtSetting = _configuration.GetSection("JwtSetting").Get<JwtSetting>();
        var tokenDescriptor = new SecurityTokenDescriptor{
            Subject = new ClaimsIdentity(new Claim[]{
                new(ClaimTypes.NameIdentifier, findResult.Id.ToString()),
                new(ClaimTypes.Name, findResult.UserName),
                new(ClaimTypes.Role, findResult.Role),
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSetting.Secret)), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        var tokenString = jwtTokenHandler.WriteToken(token);
        return Ok(new UserRole{Token = tokenString, Role = findResult.Role});
    }

    [HttpGet]
    [Authorize("User")]
    public ActionResult GetUser(){
        string username = User.Identity.Name;
        return Ok(username);
    }
}