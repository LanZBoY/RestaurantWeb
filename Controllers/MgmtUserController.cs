using Microsoft.AspNetCore.Mvc;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class MgmtUsersController(UserContext userContext) : ControllerBase{
    private readonly UserContext _context = userContext;

    [HttpGet]
    public ActionResult<List<MgmtViewUser>> GetAllUser(){
        return Ok(_context.MgmtViewUsers.ToList());
    }
}

[ApiController]
[Route("[controller]")]
public class MgmtUserController(UserContext userContext) : ControllerBase{
    private readonly UserContext _context = userContext;

    [HttpGet("{UserName}")]
    public ActionResult<MgmtViewUser> GetUser(string UserName){
        MgmtViewUser? result = _context.MgmtViewUsers.Where((item) => item.UserName == UserName).FirstOrDefault();
        if (result == null){
            return NotFound();
        }
        return Ok(result);
    }
}