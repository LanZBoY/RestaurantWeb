using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(policy: "Admin")]
public class MgmtController(RestaurantContext restaurantContext) : ControllerBase
{
    private readonly RestaurantContext _context = restaurantContext;
    private readonly DbSet<UserModel> UserTable = restaurantContext.Users;
    private readonly DbSet<RestaurantModel> RestaurantTable = restaurantContext.Restaurants;
    private readonly DbSet<UserRestaurantRateModel> UserRestaurantRateTable = restaurantContext.UserRestaurantRates;
    private readonly string STORAGE_ROOT = ".\\storage";
    [HttpGet("Users")]
    public ActionResult<List<UserModel>> GetAllUser()
    {
        return Ok(
            _context
            .Users
            .Select(user => new MgmtUsersDTO
            {
                Id = user.Id,
                UserName = user.UserName,
                Mail = user.Mail
            })
            .ToList()
        );
    }

    [HttpGet("Restaurants")]
    public ActionResult GetRestaurant([FromQuery] string? searchResaurant)
    {
        var query = from restaurant in _context.Restaurants
                    where restaurant!.Name!.Contains(searchResaurant ?? "")
                    select new
                    {
                        restaurant.Id,
                        restaurant.Name,
                        restaurant.Desc,
                        restaurant.Img,
                    };
        return Ok(query.ToList());
    }
    [HttpPost("Restaurants")]
    public ActionResult CreateRestaurant(AddRestaurantDTO addRestaurant)
    {
        _context.Restaurants.Add(new RestaurantModel
        {
            Name = addRestaurant.Name,
            Desc = addRestaurant.Desc,
            Img = addRestaurant.Img
        });
        if (_context.SaveChanges() <= 0)
        {
            return BadRequest(new
            {
                ErrorMessage = "Data not change"
            });
        }
        return Created();
    }
    [HttpGet("UserRatings/{UserId:guid}")]
    public ActionResult GetUserRatings(Guid UserId)
    {
        var query = from rating in UserRestaurantRateTable
                    join restaurant in RestaurantTable
                    on rating.RestaurantId equals restaurant.Id
                    where rating.UserId == UserId
                    select new
                    {
                        restaurant.Name,
                        restaurant.Desc,
                        rating.rating,
                    };
        return Ok(query.ToList());
    }
    [HttpDelete("Restaurants/{rId:guid}")]
    public ActionResult DeleteRestaurant(Guid rId)
    {
        int count = _context.Restaurants.Where(item => item.Id == rId).ExecuteDelete();
        return Ok(new { deleteCount = count });
    }

    [HttpPost("images/{imgName}")]
    public async Task<IActionResult> UploadImg(string imgName, IFormFile imgFile)
    {
        if (imgFile.Length > 0)
        {
            string filePath = Path.Combine(STORAGE_ROOT, imgName);

            Console.WriteLine(filePath);
            using FileStream fs = new(filePath, FileMode.Create);
            await imgFile.CopyToAsync(fs);

        }
        return Created();
    }
}