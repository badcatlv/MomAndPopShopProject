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

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
            var cartItem = await _context.CartItems.ToListAsync();
            if (_context.CartItems == null)
            {
                return NotFound("No Items.");
            }

            return Ok(cartItem);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);

            if (cartItem == null)
            {
                return NotFound("Item not Found");
            }
            return Ok(cartItem);
        }

        [HttpPost]
        public async Task<ActionResult<CartItem>> AddToCart(CartItem cartItem)
        {
            if (cartItem == null)
            {
                return NotFound("Item Not Found");
            }

            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return Ok(cartItem);
        }

        [HttpDelete("{id}")]
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

        }
    }
}

