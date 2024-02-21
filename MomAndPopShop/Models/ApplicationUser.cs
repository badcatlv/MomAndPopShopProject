using Microsoft.AspNetCore.Identity;

namespace MomAndPopShop.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int RewardPoints { get; set; } = 0;
        public double StoreCredit { get; set; } = 0.00;
        public string? ProfilePicture { get; set; }
        public string? Birthday { get; set; }
        public bool SubscribedToPromotionalEmail { get; set; } = false;
        public bool SubscribedToPromotionalText { get; set; } = false;
        public List<Order>? Orders { get; set; }

        
    }
}