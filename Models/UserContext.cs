using Microsoft.EntityFrameworkCore;

namespace Restaurant.Models;

public class UserContext : DbContext{
    public UserContext(DbContextOptions<UserContext> options) : base(options){
        
    }

    public DbSet<MgmtViewUser> MgmtViewUsers {get; set;}
}