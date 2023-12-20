using Microsoft.AspNetCore.Mvc;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController(UserContext userContext) : ControllerBase{
    private readonly UserContext _context = userContext;

    [HttpGet]
    public ActionResult<List<User>> GetAllUser(){
        return Ok(_context.Users.ToList());
    }
}

[ApiController]
[Route("[controller]")]
public class UserController(UserContext userContext) : ControllerBase{
    private readonly UserContext _context = userContext;

    [HttpGet("{Id:long}")]
    public ActionResult<User> GetUser(long Id){
        User? result = _context.Users.Where((item) => item.Id == Id).FirstOrDefault();
        if (result == null){
            return NotFound();
        }
        return Ok(result);
    }
}