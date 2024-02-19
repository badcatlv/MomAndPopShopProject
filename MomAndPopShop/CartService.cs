using MomAndPopShop.Data;
using MomAndPopShop.Models;
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
            _cart = GetCartFromSession();
        }

        public Cart GetCart()
        {
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
                };
                _cart.Items.Add(item);
            }
            else
            {
                item.Quantity += quantity;
            }
            UpdateCartInSession();
        }

        public void AddToCart(int popId, int quantity)
        {
            var item = _context.Popcorns.Find(popId);
            if (item != null)
            {
                var newItem = new CartItem
                {
                    PopcornItem = item,
                    Quantity = quantity,
                    Cost = item.PopcornPrice * quantity
                };
                _cart.Items.Add(newItem);
            }
        }

        private void UpdateCartInSession()
        {
            var cartJson = JsonConvert.SerializeObject(_cart);
            _httpContextAccessor.HttpContext.Session.SetString("Cart", cartJson);
        }

        public void UpdateCart(Cart cart)
        {
            _cart = cart;
            SaveCartToSession(_cart);
        }

        private void SaveCartToSession(Cart cart)
        {
            var cartJson = JsonConvert.SerializeObject(cart);
            _httpContextAccessor.HttpContext.Session.SetString("Cart", cartJson);
        }

        private Cart GetCartFromSession()
        {
            var cartJson = _httpContextAccessor.HttpContext.Session.GetString("Cart");
            if (cartJson != null)
            {
                return JsonConvert.DeserializeObject<Cart>(cartJson);
            }

            var cart = new Cart();
            _httpContextAccessor.HttpContext.Session.SetString("Cart", JsonConvert.SerializeObject(cart));
            return new Cart();
        }

        public void RemoveItem(int id)
        {
            var cart = GetCart();
            var item = cart.Items.FirstOrDefault(x => x.PopcornItem.Id == id);
            if (item != null)
            {
                cart.Items.Remove(item);
                UpdateCartInSession();
            }
        }

        public void ClearCart()
        {
            _httpContextAccessor.HttpContext.Session.Remove("Cart");
        }
    }
}
