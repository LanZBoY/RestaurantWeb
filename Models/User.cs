using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurant.Models;

// 可以透過這個Atrribute指定Table跟Schema
// Reference : https://medium.com/@pawel.gerr/entity-framework-core-changing-database-schema-at-runtime-dcf1211768c6
[Table(name: "UserInformation", Schema = "User")]
public class User{
    [Key]
    public long Id{get; set;}
    public string? UserName {get; set;}
    public string? Password{get; set;}
}