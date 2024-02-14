using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly CartService _cartService;

        public CartController(CartService cartService, ApplicationDbContext context)
        {
            _cartService = cartService;
            _context = context;
        }

        [HttpGet]
        public ActionResult GetCart()
        {
            var cart = _cartService.GetCart();            

            return Ok(cart);
        }

        [HttpPost("AddToCart")]
        public IActionResult AddToCart([FromBody] AddToCartViewModel model)
        {
            if (ModelState.IsValid)
            {
                var cart = _cartService.GetCart();

                var existingItem = cart.Items.FirstOrDefault(x => x.PopcornItem.Id == model.PopcornId);
                if (existingItem != null)
                {
                    existingItem.Quantity = model.Quantity;
                    _cartService.UpdateCart(cart);
                    return Ok(new { updated = true });
                }

                _cartService.AddItem(model.PopcornId, model.Quantity);
                _cartService.UpdateCart(cart);
                return Ok(new { updated = false });
            }

            return BadRequest(ModelState);
        }
        [HttpPost("{id}")]
        public async Task<IActionResult> Buy(int id)
        {
            var product = await _context.Popcorns.FindAsync(id);    
            if (product != null)
            {
                _cartService.AddItem(product.Id, 1);
                return Ok();
            }
            else
            {
                return NotFound();
            }
            
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            _cartService.RemoveItem(id);

            return Ok();
        }

        [HttpPost("Clear")]
        public IActionResult Clear()
        {
            _cartService.ClearCart();

            return Ok();
        }

        /*[HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
            var cartItem = await _context.CartItems.ToListAsync();
            if (_context.CartItems == null)
            {
                return NotFound("No Items.");
            }

            return Ok(cartItem);
        }*/

        /*[HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);

            if (cartItem == null)
            {
                return NotFound("Item not Found");
            }
            return Ok(cartItem);
        }*/

        /*[HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);

            if (cartItem == null)
            {
                return NotFound("Item not found");
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();

        [HttpPost]
        public async Task<ActionResult> UpdateItemQuantity(int itemId, int quantity)
        {
            _cartService.UpdateItemQuantity(itemId, quantity);

            return Ok();
        }

        }*/
    }
}

