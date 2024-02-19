using Duende.IdentityServer.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MomAndPopShop.Models
{
    public class CustomerReview
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Review is required")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "Review must be between 3 and 500 characters")]
        public string Review { get; set; }

        public CustomerReview(string review)
        {
            Review = review;
        }

        public CustomerReview()
        {
        }
    }
}
