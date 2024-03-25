using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(RestaurantContext restaurantContext, IConfiguration configuration) : ControllerBase
{
    private readonly RestaurantContext _context = restaurantContext;
    private readonly DbSet<UserModel> UserTable = restaurantContext.Users;
    private readonly DbSet<RestaurantModel> RestaurantTable = restaurantContext.Restaurants;
    private readonly DbSet<UserRestaurantRateModel> UserRestaurantRateTable = restaurantContext.UserRestaurantRates;
    private readonly IConfiguration _configuration = configuration;

    // private static readonly string UNKNOWN = "unknown";

    private string GetTokenByUser(UserModel user)
    {

        if (user == null) throw new Exception("User Can't not be null here");

        var jwtTokenHandler = new JwtSecurityTokenHandler();
        string secret = _configuration["JwtSetting:Secret"]!;
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity([
                new Claim(ClaimTypes.Sid, user.Id.ToString()!),
                new Claim(ClaimTypes.Role, user.Role!),
                new Claim(ClaimTypes.Name, user.UserName!),
                new Claim(ClaimTypes.Email, user.Mail!),
            ]),
            Expires = DateTime.UtcNow.AddMinutes(5),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret)), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        var tokenString = jwtTokenHandler.WriteToken(token);
        return tokenString;
    }

    [HttpPost("Register")]
    public ActionResult<UserRegisterDTO> RegisterUser(UserRegisterDTO userdata)
    {
        // check whether username has exist in database
        if (UserTable.Any((item) => item.UserName == userdata.UserName))
        {
            return BadRequest(new
            {
                ErrorMessage = "UserName has exist!"
            });
        }
        // start insert data into database
        UserModel newUser = new()
        {
            UserName = userdata.UserName,
            Password = userdata.Password,
            Mail = userdata.Mail,
            Role = "User"
        };
        UserTable.Add(newUser);
        // excute SQL
        if (_context.SaveChanges() <= 0)
        {
            return BadRequest(new
            {
                ErrorMessage = "Data not change"
            });
        }

        return new CreatedResult("Database", GetTokenByUser(newUser));
    }

    [HttpPost("Login")]
    public ActionResult Login(UserLoginDTO user)
    {
        // 資料庫搜尋邏輯
        UserModel? findResult = UserTable.Where((item) => (item.UserName == user.UserName) & (item.Password == user.Password)).FirstOrDefault();

        if (findResult == null || findResult.Id == null || findResult.Role == null) return NotFound();

        string tokenString = GetTokenByUser(findResult);

        return Ok(tokenString);
    }

    [HttpGet]
    [Authorize(policy: "All")]
    public ActionResult GetUser()
    {
        UserModel user = new()
        {
            Id = Guid.Parse(User.FindFirstValue(ClaimTypes.Sid)!),
            UserName = User.FindFirstValue(ClaimTypes.Name),
            Role = User.FindFirstValue(ClaimTypes.Role),
            Mail = User.FindFirstValue(ClaimTypes.Email),
        };
        return Ok(new
        {
            user.UserName,
            user.Mail,
            newToken = GetTokenByUser(user)
        });
    }

    [HttpPost("Rate/{rId:guid}/{rate:float}")]
    [Authorize(policy: "All")]
    public ActionResult RateRestaurant(Guid rId, float rate)
    {
        string? userId = User.FindFirstValue(ClaimTypes.Sid);
        if (userId == null)
        {
            return BadRequest("Please relogin account");
        }
        Guid uuid = Guid.Parse(userId);
        if (!UserTable.Any(user => user.Id == uuid))
        {
            return BadRequest("User not exsit");
        }
        if (!RestaurantTable.Any(restaurant => restaurant.Id == rId))
        {
            return BadRequest("Restaurant not exsit");
        }

        UserRestaurantRateTable.Add(new UserRestaurantRateModel
        {
            UserId = uuid,
            RestaurantId = rId,
            rating = rate
        });
        // Excute SQL Command
        if (_context.SaveChanges() <= 0)
        {
            return BadRequest(new
            {
                ErrorMessage = "Data not change"
            });
        }
        return Ok();
    }
}