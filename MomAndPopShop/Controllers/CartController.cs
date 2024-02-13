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

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult GetCart()
        {
            var cart = _cartService.GetCart();            

            return Ok(cart);
        }

        //[HttpPost("{id}")]
        [HttpPost("Cart/AddToCart")]
        public async Task<ActionResult> Add(int id)
        {
            var popcorn = await _context.Popcorns.FindAsync(id);
            if (popcorn == null)
            {
                return NotFound("Item not found");
            }

            _cartService.AddItem(popcorn, 1);

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> UpdateItemQuantity(int itemId, int quantity)
        {
            _cartService.UpdateItemQuantity(itemId, quantity);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _cartService.RemoveItem(id);

            return Ok();
        }

        [HttpDelete]
        public IActionResult ClearCart()
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

        }*/
    }
}

