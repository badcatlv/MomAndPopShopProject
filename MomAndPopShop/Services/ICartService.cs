using MomAndPopShop.Models;

namespace MomAndPopShop.Services
{
    public interface ICartService
    {
        void AddItem(Popcorn item, int quantity);
        void RemoveItem(int itemId);
        void UpdateItemQuantity(int itemId, int quantity);
        void UpdateCart(Cart cart); 
        void ClearCart();
        Cart GetCart();

    }
}
