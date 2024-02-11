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
        public Popcorn Popcorn { get; set; }
        public int? PopcornId { get; set; }
        public string? PopcornName { get; set; }
        [Precision(18, 2)]

        public decimal? PopcornPrice { get; set; }
        public string? PopcornDescription { get; set; }
        public int? PopcornQuantity { get; set; }
        public List<Popcorn> Popcorns { get; set; }

        public CartItem ()
        {
            PopcornId = Popcorn.Id;
            PopcornName = Popcorn.Name;
            PopcornPrice = Popcorn.PopcornPrice;
            PopcornDescription = Popcorn.Description;
            PopcornQuantity = Popcorn.Quantity;
            Popcorns = new List<Popcorn>();
        }
    }
}
