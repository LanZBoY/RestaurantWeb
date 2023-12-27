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
    [HttpGet("UserRatings/{UserName}")]
    public ActionResult GetAllUserRatings(string? UserName){
        return Ok();
    }
}