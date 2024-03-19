
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Restaurant.Models;

[Table(name: "Restaurant")]
public class RestaurantModel
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key, Column("rId")]
    public Guid? Id { get; set; }
    public string? Img { get; set; }
    public string? Name { get; set; }
    public string? Desc { get; set; }
}

public class SearchResaurantDTO
{
    public string? Name { get; set; }
}
public class AddRestaurantDTO
{
    [Required]
    public required string Name { get; set; }
    [Required]
    public required string Desc { get; set; }
}

[Table(name: "UserRestaurantRate")]
[PrimaryKey(nameof(UserId), nameof(RestaurantId))]
public class UserRestaurantRateModel
{
    [Column("uId"), ForeignKey("User.uId")]
    public Guid? UserId { get; set; }
    [Column("rId"), ForeignKey("Restaurant.rId")]
    public Guid? RestaurantId { get; set; }

    public float rating { get; set; }
}