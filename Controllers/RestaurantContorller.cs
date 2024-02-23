using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Restaurant.Models;

[ApiController]
[Route("[controller]")]
public class RestaurantsController(RestaurantContext restaurantContext) : ControllerBase{
    private readonly RestaurantContext _context = restaurantContext;
    [HttpGet]
    public ActionResult GetAllRestaurant(){
        return Ok(_context.Restaurants.ToList());
    }

    [HttpPost]
    public ActionResult SearchResaurant(SearchResaurantDTO searchResaurant){
        if (searchResaurant.Name == null){
            return Ok(_context.Restaurants.ToList());
        }
        var query = from restaurant in _context.Restaurants
        where restaurant.Name.Contains(searchResaurant.Name)
        select new {
            restaurant.Id,
            restaurant.Name,
            restaurant.Desc
        };
        return Ok(query.ToList());
    }
}