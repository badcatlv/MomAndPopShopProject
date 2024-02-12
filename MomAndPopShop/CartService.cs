using MomAndPopShop.Data;
using MomAndPopShop.Models;
using MomAndPopShop.Services;
using Newtonsoft.Json;

namespace MomAndPopShop
{
    public class CartService : ICartService
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private Cart? _cart = new Cart();

        public CartService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public Cart GetCart()
        {
            var cart = _httpContextAccessor.HttpContext.Session.GetString("Cart");
            if (cart != null)
            {
                _cart = JsonConvert.DeserializeObject<Cart>(cart);
            }
            return _cart;
        }

        public void AddItem(Popcorn popItem, int quantity)
        {
            var item = _cart.Items.FirstOrDefault(x => x.PopcornItem.Id == popItem.Id);

            if (item == null)
            {
                item = new CartItem
                {
                    PopcornItem = popItem,
                    Quantity = quantity,
                    Cost = popItem.PopcornPrice * quantity
                };
            }
            else
            {
                item.Quantity += quantity;
            }

            /*var cart = GetCart();
            var cartItem = new CartItem
            {
                PopcornItem = item,
                Quantity = quantity,
                Cost = item.PopcornPrice * quantity
            };
            cart.Items.Add(cartItem);
            cart.TotalCost += cartItem.Cost;
            _httpContextAccessor.HttpContext.Session.SetString("Cart", JsonConvert.SerializeObject(cart));*/
        }

        public void UpdateItemQuantity(int itemId, int quantity)
        {
            var item = _cart.Items.FirstOrDefault(x => x.PopcornItem.Id == itemId);
            if (item != null)
            {
                item.Quantity = quantity;
                item.Cost = item.PopcornItem.PopcornPrice * quantity;
            }
        }

        public void UpdateCart(Cart cart)
        {
            var cartJson = JsonConvert.SerializeObject(cart);
            _httpContextAccessor.HttpContext.Session.SetString("Cart", cartJson);
        }

        public void RemoveItem(int id)
        {
            var cart = GetCart();
            var item = cart.Items.FirstOrDefault(x => x.PopcornItem.Id == id);
            if (item != null)
            {
                cart.Items.Remove(item);
                cart.TotalCost -= item.Cost;
                UpdateCart(cart);
            }
        }

        public void ClearCart()
        {
            _httpContextAccessor.HttpContext.Session.Remove("Cart");
        }
    }
}
