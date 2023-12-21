using Microsoft.AspNetCore.Mvc;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class MgmtUserController(UserContext userContext) : ControllerBase{
    private readonly UserContext _context = userContext;

    [HttpGet]
    public ActionResult<List<User>> GetAllUser(){
        return Ok(_context.Users.ToList());
    }

    [HttpGet("{UserName}")]
    public ActionResult<List<User>> FindUser(string UserName){
        List<User>? result = [.. _context.Users.Where((item) => item.UserName == UserName)];
        return Ok(result);
    }
}