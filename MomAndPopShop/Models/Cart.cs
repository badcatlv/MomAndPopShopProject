using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MomAndPopShop.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public List<CartItem>? Items { get; set; }
        [Precision(18, 2)]
        public decimal? TotalCost { get; set; }

        public Cart()
        {
            Items = new List<CartItem>();
            TotalCost = Items.Sum(i => i.Cost);
        }
    }
}
