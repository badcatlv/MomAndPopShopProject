using MomAndPopShop.Models;

namespace MomAndPopShop
{
    public interface ICartService
    {
        void AddItem(int item, int quantity);
        void AddToCart(int itemId, int quantity);
        void RemoveItem(int itemId);
        void ClearCart();
        Cart GetCart();

    }
}
