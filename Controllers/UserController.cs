using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(RestaurantContext restaurantContext) : ControllerBase{
    // private readonly RestaurantContext _context = restaurantContext;
    private readonly DbSet<UserModel> UserTable = restaurantContext.Users;
    [HttpGet]
    [Authorize(policy:"All")]
    public ActionResult GetUser(){
        Guid uuid =  Guid.Parse(User.Identity.Name);
        UserModel? info = UserTable.Where((item) => item.Id == uuid).FirstOrDefault();
        return Ok(info);
    }
}