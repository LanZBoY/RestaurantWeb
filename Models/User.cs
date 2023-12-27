using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Restaurant.Models;


[Table(name: "User")]
public class UserModel{
    [Key]
    [JsonIgnore]
    [Column("uId")]
    public Guid? Id{get; set;}
    public string? UserName {get; set;}
    [JsonIgnore]
    public string? Password{get; set;}
    public string? Mail{get; set;}
    [JsonIgnore]
    public string? Role{get; set;}
}

public class LoginViewUser{
    [Required]
    public required string UserName{get; set;}
    [Required]
    public required string Password{get; set;}
}

public class RegisterViewUser{
    [Required]
    public required string UserName {get; set;}
    [Required]
    public required string Password {get; set;}
    [Required]
    public required string Mail{get; set;}
}