using Microsoft.AspNetCore.Identity;

namespace MomAndPopShop.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? UserAdress { get; set; }
        public int UserPhone { get; set; } =  0;
    }
}