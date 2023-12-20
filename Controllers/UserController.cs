using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurant.Models;

namespace Restaurant.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(UserContext userContext) : ControllerBase{
    private readonly UserContext _context = userContext;

    [HttpPost("Login")]
    public ActionResult Login(LoginViewUser user){
        MgmtViewUser? findResult = _context.MgmtViewUsers.Where((item) => (item.UserName == user.UserName) & (item.Password == user.Password)).FirstOrDefault();
        if (findResult == null) return NotFound();
        return Ok();
    }
}