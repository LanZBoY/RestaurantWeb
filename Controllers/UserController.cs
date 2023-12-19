using Microsoft.AspNetCore.Mvc;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase{
    private readonly UserContext _context;

    public UsersController(UserContext userContext){
        _context = userContext;
    }

    [HttpGet]
    public List<User> GetAllUser(){
        
        return [.. _context.Users];
    }
}

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase{
    [HttpGet("{Id:long}")]
    public List<User> GetUser(long Id){
        return [new User(){Id = Id, UserName = "WenTee", Password = "IDK"}];
    }
}