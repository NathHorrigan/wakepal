using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace PRCO204.Models
{
    public class AuthenticateModel
    {

    [Required]
    public string email { get; set; }

    [Required]
    public string password { get; set; }
    }
}
