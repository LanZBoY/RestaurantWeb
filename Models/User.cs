using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

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

public class UserLoginDTO{

    [Required, FromHeader]
    public required string UserName{get; set;}
    [Required, FromHeader]
    public required string Password{get; set;}
}

public class UserRegisterDTO{
    [Required]
    public required string UserName {get; set;}
    [Required]
    public required string Password {get; set;}
    [Required]
    public required string Mail{get; set;}
}