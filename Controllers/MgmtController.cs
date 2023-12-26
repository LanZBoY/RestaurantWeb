using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor.TagHelpers;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class MgmtController(RestaurantContext restaurantContext) : ControllerBase{
    private readonly RestaurantContext _context = restaurantContext;

    [HttpGet("Users")]
    public ActionResult<List<UserModel>> GetAllUser(){
        return Ok(_context.Users.ToList());
    }

    [HttpGet("Restaurants")]
    public ActionResult<List<RestaurantModel>> GetAllRestaurant(){
        return Ok(_context.Restaurants.ToList());
    }
    [HttpGet("UserRatings")]
    public ActionResult GetAllUserRatings(){
        var query = _context.UserRestaurantRates
        .Join(
            _context.Users,
            urr => urr.UserId,
            user => user.Id,
            (urr, user) => 
            new {UserName = user.UserName, rId = urr.RestaurantId, Rating = urr.rating})
        .Join(_context.Restaurants, userrating => userrating.rId, restaurant => restaurant.Id,
        (userrating, restaurant) => new {UserName = userrating.UserName, RestaurantName = restaurant.Name, Rating = userrating.Rating});
        return Ok(query);
    }
}