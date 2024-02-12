using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductHome : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductHome(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Popcorn>>> GetProductHome()
        {
            var productHome = await _context.Popcorns.ToListAsync();
            if (_context.Popcorns == null)
            {
                return NotFound("No Items.");
            }

            return Ok(productHome);
        }
        
    }
}
