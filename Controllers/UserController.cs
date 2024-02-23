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

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(RestaurantContext restaurantContext, IConfiguration configuration) : ControllerBase{
private readonly RestaurantContext _context = restaurantContext;
    private readonly DbSet<UserModel> UserTable = restaurantContext.Users;
    private readonly DbSet<RestaurantModel> RestaurantTable = restaurantContext.Restaurants;
    private readonly DbSet<UserRestaurantRateModel> UserRestaurantRateTable = restaurantContext.UserRestaurantRates;
    private readonly IConfiguration _configuration = configuration;

    [HttpPost("Register")]
    public ActionResult<UserRegisterDTO> RegisterUser(UserRegisterDTO userdata){
        // check whether username has exist in database
        if (UserTable.Any((item) => item.UserName == userdata.UserName)){
            return BadRequest(new{
                ErrorMessage = "UserName has exist!"
            });
        }
        // start insert data into database
        UserTable.Add(new UserModel{
            UserName = userdata.UserName,
            Password = userdata.Password,
            Mail = userdata.Mail,
            Role = "User"
        });
        // excute SQL
        if(_context.SaveChanges() <= 0){
            return BadRequest(new{
                ErrorMessage = "Data not change"
            });
        }

        return Created();
    }
    
    [HttpPost("Login")]
    public ActionResult Login(UserLoginDTO user){
        // 資料庫搜尋邏輯
        UserModel? findResult = UserTable.Where((item) => (item.UserName == user.UserName) & (item.Password == user.Password)).FirstOrDefault();
        
        if (findResult == null || findResult.Id == null || findResult.Role == null) return NotFound();
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        string secret = _configuration["JwtSetting:Secret"];
        var tokenDescriptor = new SecurityTokenDescriptor{
            Subject = new ClaimsIdentity(new Claim[]{
                new(ClaimTypes.Name, findResult.Id.ToString()),
                new(ClaimTypes.Role, findResult.Role),
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret)), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        var tokenString = jwtTokenHandler.WriteToken(token);
        return Ok(new UserRole{Token = tokenString, Role = findResult.Role});
    }

    [HttpGet]
    [Authorize(policy:"All")]
    public ActionResult GetUser(){
        if (User.Identity == null || User.Identity.Name == null){
            return BadRequest("Please relogin account");
        }
        Guid uuid =  Guid.Parse(User.Identity.Name);
        UserModel? info = UserTable.Where((item) => item.Id == uuid).FirstOrDefault();
        return Ok(info);
    }

    [HttpPost("Rate/{rId:guid}/{rate:float}")]
    [Authorize(policy:"All")]
    public ActionResult RateRestaurant(Guid rId, float rate){
        if (User.Identity == null || User.Identity.Name == null){
            return BadRequest("Please relogin account");
        }
        Guid uuid =  Guid.Parse(User.Identity.Name);
        if (UserTable.Count(user => user.Id == uuid) < 1){
            return BadRequest("User not exsit");
        }
        if (RestaurantTable.Count(restaurant => restaurant.Id == rId) < 1){
            return BadRequest("Restaurant not exsit");
        }
        UserRestaurantRateTable.Add(new UserRestaurantRateModel{
            UserId = uuid,
            RestaurantId = rId,
            rating = rate
        });
        // Excute SQL Command
        if (_context.SaveChanges() <= 0){
            return BadRequest(new{
                ErrorMessage = "Data not change"
            });
        }
        return Ok(rId);
    }
}