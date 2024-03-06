using Duende.IdentityServer.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MomAndPopShop.Models
{
    public class Popcorn
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 50 characters")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "Description must be between 3 and 500 characters")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be 0.01 or greater.")]
        [Precision(18, 2)]
        public decimal PopcornPrice { get; set; }

        [Range(0.01, int.MaxValue, ErrorMessage = "Quantity must be 1 or greater.")]
        public int? Quantity { get; set; }

        /*This is the SKU addition for stripe product connection*/
        public string? StripeSku { get; set; } = "";

        public Popcorn(string name, string description, decimal popcornPrice, string? stripeSku)
        {
            Name = name;
            Description = description;
            PopcornPrice = popcornPrice;
            Quantity = 0;
            StripeSku = stripeSku;
        }
        public Popcorn() { }

    }
}
