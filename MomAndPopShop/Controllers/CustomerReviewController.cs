using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerReviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomerReviewController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [HttpGet("{id}")]
        public async Task<IActionResult> Index(int id = 0)
        {
            if (id == 0)
            {
                return Ok(await _context.CustomerReviews.ToListAsync());
            }
            else
            {
                return Ok(await _context.CustomerReviews.FindAsync(id));
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CustomerReview customerReview)
        {
            if (ModelState.IsValid)
            {
                _context.CustomerReviews.Add(customerReview);
                await _context.SaveChangesAsync();

                return Ok(customerReview);
            }

            return BadRequest(ModelState);
        }

    }
}