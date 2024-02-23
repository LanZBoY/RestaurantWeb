using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(policy:"Admin")]
public class MgmtController(RestaurantContext restaurantContext) : ControllerBase{
    private readonly RestaurantContext _context = restaurantContext;
    private readonly DbSet<UserModel> UserTable = restaurantContext.Users;
    private readonly DbSet<RestaurantModel> RestaurantTable = restaurantContext.Restaurants;
    private readonly DbSet<UserRestaurantRateModel> UserRestaurantRateTable = restaurantContext.UserRestaurantRates;

    [HttpGet("Users")]
    public ActionResult<List<UserModel>> GetAllUser(){
        return Ok(
            _context
            .Users
            .Select(user => new MgmtUsersDTO{
            Id = user.Id,
            UserName = user.UserName,
            Mail = user.Mail})
            .ToList()
        );
    }

    [HttpGet("Restaurants")]
    public ActionResult<List<RestaurantModel>> GetAllRestaurant(){
        return Ok(_context.Restaurants.ToList());
    }
    [HttpPost("Restaurants")]
    public ActionResult CreateRestaurant(AddRestaurantDTO addRestaurant){
        _context.Restaurants.Add(new RestaurantModel{
            Name = addRestaurant.Name,
            Desc = addRestaurant.Desc
        });
        if(_context.SaveChanges() <= 0){
            return BadRequest(new{
                ErrorMessage = "Data not change"
            });
        }
        return Created();
    }
    [HttpGet("UserRatings/{UserId:guid}")]
    public ActionResult GetUserRatings(Guid UserId){
        var query = from rating in UserRestaurantRateTable
                    join restaurant in RestaurantTable
                    on rating.RestaurantId equals restaurant.Id
                    where rating.UserId == UserId
                    select new {
                        restaurant.Name,
                        restaurant.Desc,
                        rating.rating,
                    };
        return Ok(query.ToList());
    }
}