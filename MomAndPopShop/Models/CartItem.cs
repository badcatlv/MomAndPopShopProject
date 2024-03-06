using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MomAndPopShop.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Cart")]
        public int CartId { get; set; }
        public Popcorn PopcornItem { get; set; }
        public int Quantity { get; set; }
        [Precision(18, 2)]
        public decimal Cost { get; set; }

        
    }
        
}
