using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MomAndPopShop.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        public Popcorn Popcorn { get; set; }
        public int? PopcornId { get; set; }
        public string? PopcornName { get; set; }
        public double? PopcornPrice { get; set; }
        public string? PopcornDescription { get; set; }
        [Precision(18, 2)]
        public int? PopcornQuantity { get; set; }
        public ICollection<Popcorn> Popcorns { get; set; }

        public CartItem (int id)
        {
            Id = id;
            PopcornId = Popcorn.Id;
            PopcornName = Popcorn.Name;
            PopcornPrice = Popcorn.PopcornPrice;
            PopcornDescription = Popcorn.Description;
            PopcornQuantity = Popcorn.Quantity;
            Popcorns = new List<Popcorn>();
        }
    }
}
