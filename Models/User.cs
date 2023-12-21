using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Restaurant.Models;

// 可以透過這個Atrribute指定Table跟Schema
// Reference : https://medium.com/@pawel.gerr/entity-framework-core-changing-database-schema-at-runtime-dcf1211768c6
// [Table(name: "User")]
// public class User{
//     [Key]
//     public long Id{get; set;}
//     public string? UserName {get; set;}
//     public string? Password{get; set;}

//     public string? Mail{get; set;}
// }


[Table(name: "User")]
public class User{
    [Key]
    [JsonIgnore]
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