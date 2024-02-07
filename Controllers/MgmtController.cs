using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor.TagHelpers;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(policy:"Admin")]
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
    [HttpPost("Restaurants")]
    public ActionResult CreateRestaurant(RestaurantModel restaurant){
        _context.Restaurants.Add(restaurant);
        if(_context.SaveChanges() <= 0){
            return BadRequest(new{
                ErrorMessage = "Data not change"
            });
        }
        return Created();
    }
    [HttpGet("UserRatings/{UserName}")]
    public ActionResult GetAllUserRatings(string? UserName){
        return Ok();
    }
}