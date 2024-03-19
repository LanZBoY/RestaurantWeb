using Microsoft.AspNetCore.Mvc;
using Restaurant.Models;

namespace Restaurant.Controllers;
[ApiController]
[Route("[controller]")]
public class RestaurantsController(RestaurantContext restaurantContext) : ControllerBase
{
    private readonly RestaurantContext _context = restaurantContext;
    [HttpGet]
    public ActionResult GetRestaurant([FromQuery] string? searchResaurant)
    {
        var query = from restaurant in _context.Restaurants
                    where restaurant!.Name!.Contains(searchResaurant ?? "")
                    select new
                    {
                        restaurant.Id,
                        restaurant.Name,
                        restaurant.Desc
                    };
        return Ok(query.ToList());
    }
}