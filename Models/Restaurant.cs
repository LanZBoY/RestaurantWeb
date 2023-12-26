
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Restaurant.Models;

[Table(name:"Restaurant")]
public class RestaurantModel{
    [Column("rId")]
    public Guid? Id{get; set;}
    public string? Name{get; set;}
    public string? Desc{get; set;}
}


[Table(name:"UserRestaurantRate")]
[Keyless]
public class UserRestaurantRateModel{
    [Column("uId")]
    public Guid? UserId {get; set;}
    [Column("rId")]
    public Guid? RestaurantId {get; set;}

    public float rating {get; set;}
}