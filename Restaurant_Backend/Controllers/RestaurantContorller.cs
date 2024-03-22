using Microsoft.AspNetCore.Mvc;
using Restaurant.Models;

namespace Restaurant.Controllers;
[ApiController]
[Route("[controller]")]
public class RestaurantsController(RestaurantContext restaurantContext) : ControllerBase
{
    private readonly RestaurantContext _context = restaurantContext;
    private readonly string STORAGE_ROOT = ".\\storage";

    [HttpGet]
    public ActionResult GetRestaurant([FromQuery] string? searchResaurant)
    {
        var query = from restaurant in _context.Restaurants
                    where restaurant!.Name!.Contains(searchResaurant ?? "")
                    select new
                    {
                        restaurant.Id,
                        restaurant.Name,
                        restaurant.Desc,
                        restaurant.Img
                    };
        return Ok(query.ToList());
    }

    [HttpGet("images/{imgName}")]
    public IActionResult GetTempImg(string imgName)
    {
        try
        {
            byte[] b = System.IO.File.ReadAllBytes($"./storage/{imgName}");
            return File(b, "image/jpg");
        }
        catch (FileNotFoundException)
        {
            return NotFound();
        }
    }
    [HttpPost("images/{imgName}")]
    public async Task<IActionResult> UploadImg(string imgName, IFormFile imgFile)
    {
        if (imgFile.Length > 0)
        {
            string filePath = Path.Combine(STORAGE_ROOT, imgName);

            Console.WriteLine(filePath);
            using FileStream fs = new FileStream(filePath, FileMode.Create);
            await imgFile.CopyToAsync(fs);

        }
        return Created();
    }
}