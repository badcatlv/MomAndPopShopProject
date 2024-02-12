using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MomAndPopShop.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        public Cart? Cart { get; set; }
        public int CartId { get; set; }
        public Popcorn? PopcornItem { get; set; }

    }
}
