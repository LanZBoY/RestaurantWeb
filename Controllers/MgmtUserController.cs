using Microsoft.AspNetCore.Mvc;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class MgmtUserController(UserContext userContext) : ControllerBase{
    private readonly UserContext _context = userContext;

    [HttpGet]
    public ActionResult<List<MgmtViewUser>> GetAllUser(){
        return Ok(_context.MgmtViewUsers.ToList());
    }

    [HttpGet("{UserName}")]
    public ActionResult<List<MgmtViewUser>> FindUser(string UserName){
        List<MgmtViewUser>? result = [.. _context.MgmtViewUsers.Where((item) => item.UserName == UserName)];
        return Ok(result);
    }
}