using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Restaurant.Models;
using Restaurant.Settings;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(RestaurantContext restaurantContext, IConfiguration configuration) : ControllerBase{
    private readonly RestaurantContext _context = restaurantContext;
    private readonly DbSet<UserModel> UserTable = restaurantContext.Users;
    // 透過Dependency Injection的方式取得Configuration
    private readonly IConfiguration _configuration = configuration;
    [HttpPost("Login")]
    public ActionResult Login(LoginViewUser user){
        // 資料庫搜尋邏輯
        UserModel? findResult = UserTable.Where((item) => (item.UserName == user.UserName) & (item.Password == user.Password)).FirstOrDefault();
        
        if (findResult == null) return NotFound();
        
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var jwtSetting = _configuration.GetSection("JwtSetting").Get<JwtSetting>();
        var tokenDescriptor = new SecurityTokenDescriptor{
            Subject = new ClaimsIdentity(new Claim[]{
                new(ClaimTypes.Name, findResult.Id.ToString()),
                new(ClaimTypes.Role, findResult.Role),
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSetting.Secret)), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        var tokenString = jwtTokenHandler.WriteToken(token);
        return Ok(new UserRole{Token = tokenString, Role = findResult.Role});
    }

    [HttpPost("Register")]
    public ActionResult<RegisterViewUser> RegisterUser(RegisterViewUser userinfo){

        if (UserTable.Any((item) => item.UserName == userinfo.UserName)){
            return BadRequest(new{
                ErrorMessage = "UserName has exist!"
            });
        }

        UserTable.Add(new UserModel{
            UserName = userinfo.UserName,
            Password = userinfo.Password,
            Mail = userinfo.Mail,
            Role = "User"
        });

        if(_context.SaveChanges() <= 0){
            return BadRequest(new{
                ErrorMessage = "Data not change"
            });
        }

        return Created();
    }

    [HttpGet]
    [Authorize("User")]
    public ActionResult GetUser(){
        Guid uuid =  Guid.Parse(User.Identity.Name);
        UserModel? info = UserTable.Where((item) => item.Id == uuid).FirstOrDefault();
        return Ok(info);
    }
}