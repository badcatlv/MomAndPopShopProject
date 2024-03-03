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

        public void AddItem(int popItem, int quantity)
        {
            var item = _context.Popcorns.Find(popItem);
            var existingItem = _cart.Items.FirstOrDefault(x => x.PopcornItem.Id == popItem);

            if (existingItem == null)
            {
                var newItem = new CartItem
                {
                    PopcornItem = item,
                    Quantity = quantity,
                };
                _cart.Items.Add(newItem);
            }
            else
            {
                existingItem.Quantity = quantity;
                UpdateCartInSession();
            }
            //UpdateCartInSession();
        }

        public void AddToCart(int popId, int quantity)
        {
            var item = _context.Popcorns.Find(popId);
            var existingItem = _cart.Items.FirstOrDefault(x => x.PopcornItem.Id == item.Id);

            if (existingItem == null)
            {
                var newItem = new CartItem
                {
                    PopcornItem = item,
                    Quantity = quantity,
                };
                _cart.Items.Add(newItem);
            }
            else
            {
                existingItem.Quantity += quantity;
                UpdateCartInSession();
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
            UpdateCartInSession();
            //SaveCartToSession(_cart);
        }

        private void SaveCartToSession(Cart cart)
        {
            var cartJson = JsonConvert.SerializeObject(cart);
            var cartDb = _context.Carts;
            _httpContextAccessor.HttpContext.Session.SetString("Cart", cartJson);
            cartDb.Add(cart);

        }

        public void SaveCart()
        {
            SaveCartToSession(_cart);
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
            var cart = GetCart();

            cart.Items.Clear();
            UpdateCartInSession();


        }
    }
}
