using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MomAndPopShop.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        public Popcorn? PopcornItem { get; set; }
        public int Quantity { get; set; }
        [Precision(18, 2)]

        public decimal? Cost { get { return PopcornItem.PopcornPrice * Quantity; } }
    }
        
}
