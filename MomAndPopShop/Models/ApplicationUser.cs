using Microsoft.AspNetCore.Identity;

namespace MomAndPopShop.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName;
        public string LastName;
    }
}