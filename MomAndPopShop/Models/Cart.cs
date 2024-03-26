using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MomAndPopShop.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public List<CartItem>? Items { get; set; }
        [Precision(18, 2)]
        public decimal? TotalCost { get; set; }

        public Cart()
        {            
            UserId = "";
            Items = new List<CartItem>();
            TotalCost = Items.Sum(i => i.Cost);
        }
    }
}
