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
            var popcornList = await _context.Popcorns.ToListAsync();
            return Ok(popcornList);
            /*var productHome = await _context.Popcorns.ToListAsync();
            if (_context.Popcorns == null)
            {
                return NotFound("No Items.");
            }

            return Ok(productHome);*/
        }
    }
}
