using MomAndPopShop.Models;

namespace MomAndPopShop
{
    public interface ICartService
    {
        void AddItem(Popcorn item, int quantity);
        void AddToCart(int itemId, int quantity);
        void RemoveItem(int itemId);
        void ClearCart();
        Cart GetCart();

    }
}
