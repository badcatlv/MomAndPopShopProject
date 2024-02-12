using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MomAndPopShop.Models
{
    public class Cart
    {
        public int CartId { get; set; }
        public List<CartItem>? Items { get; set; }

        public Cart()
        {
        }
    }
}
