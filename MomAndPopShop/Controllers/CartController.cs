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
        public async Task<ActionResult<Cart>> CreateCart(Cart cart)
        {
            if (cart == null)
            {
                cart = new Cart();
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetCart", new { id = cart.CartId }, cart);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<CartItem>> AddItemToCart(int id, CartItem cartItem)
        {
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound("Cart not found");
            }

            cartItem.CartId = id;
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCartItem", new { id = cartItem.Id }, cartItem);
        }

        [HttpPost]
        public async Task<ActionResult<CartItem>> AddItemToCart(CartItem cartItem)
        {

            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCartItem", new { id = cartItem.Id }, cartItem);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCartItem(int id, CartItem cartItem)
        {
            if (id != cartItem.Id)
            {
                return BadRequest("Id does not match");
            }

            _context.Entry(cartItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartItemExists(id))
                {
                    return NotFound("Item not found");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool CartItemExists(int id)
        {
            throw new NotImplementedException();
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

