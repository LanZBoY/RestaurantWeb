using Microsoft.AspNetCore.Mvc;
using Restaurant.Models;

[ApiController]
[Route("[controller]")]
public class RestaurantsController(RestaurantContext restaurantContext) : ControllerBase{
    private readonly RestaurantContext _context = restaurantContext;
    [HttpGet]
    public ActionResult GetAllRestaurant(){
        return Ok(_context.Restaurants.ToList());
    }
}