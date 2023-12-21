using Microsoft.EntityFrameworkCore;

namespace Restaurant.Models;

public class UserContext(DbContextOptions<UserContext> options) : DbContext(options){
    public DbSet<User> Users {get; set;}
}