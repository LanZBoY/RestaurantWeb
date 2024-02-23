using Microsoft.EntityFrameworkCore;

namespace Restaurant.Models;

public class RestaurantContext(DbContextOptions<RestaurantContext> options) : DbContext(options){
    public DbSet<UserModel> Users {get; set;}

    public DbSet<RestaurantModel> Restaurants {get; set;}

    public DbSet<UserRestaurantRateModel> UserRestaurantRates {get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<UserRestaurantRateModel>().HasNoKey();
    }
}