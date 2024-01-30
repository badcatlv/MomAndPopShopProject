using System.ComponentModel.DataAnnotations;

namespace MomAndPopShop.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        public string? PopcornName { get; set; }
        public double PopcornPrice { get; set; }

    }
}
