using Microsoft.AspNetCore.SignalR;

namespace MomAndPopShop.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public List<CartItem> Items { get; set; }
        public Cart Cart { get; set; }

        public Order()
        {
            Items = new List<CartItem>();
        }
    }
}
