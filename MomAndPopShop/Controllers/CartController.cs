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


                _cartService.AddToCart(model.PopcornId, model.Quantity);
                _cartService.UpdateCart(cart);
                return Ok(new { updated = false });
            }

            return BadRequest(ModelState);
        }

        [HttpPost("update")]
        public IActionResult Update([FromBody] AddToCartViewModel model)
        {
            if (ModelState.IsValid)
            {
                var cart = _cartService.GetCart();


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
                _cartService.AddToCart(product.Id, 1);
                return Ok();
            }
            else
            {
                return NotFound();
            }
            
        }

        [HttpDelete("{id}")]
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

        [HttpPost("SaveCart")]
        public IActionResult SaveCart()
        {
            var cart = _cartService.GetCart();
            _cartService.SaveCartToDatabase(cart);

            return Ok();
        }

    }
}

