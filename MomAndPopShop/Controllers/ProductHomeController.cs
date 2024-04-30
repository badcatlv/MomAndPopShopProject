using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;


namespace MomAndPopShop.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductHomeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly CartService _cartService;
        public ProductHomeController(ApplicationDbContext context, CartService cartService)
        {
            _context = context;
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<ActionResult> GetProductHome()
        {
            var productHome = await _context.Seasonings.ToListAsync();
            if (_context.Seasonings == null)
            {
                return NotFound("No Items.");
            }
           //Remember to change the above Seasonings to Popcorns.

            /*var cart = _cartService.GetCart();
            foreach (var item in cart.Items)
            {
                var popcorn = productHome.FirstOrDefault(p => p.Id == item.PopcornItem.Id);
                if (popcorn != null)
                {
                    popcorn.Quantity = item.Quantity;
                }
            }*/

            return Ok(productHome);
        }
    }
}
