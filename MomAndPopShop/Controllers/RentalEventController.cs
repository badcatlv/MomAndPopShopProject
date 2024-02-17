using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RentalEventController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RentalEventController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Manage()
        {
            var rentalEventList = await _context.RentalEvents.ToListAsync();
            return Ok(rentalEventList);
        }

        [HttpPost("request")]
        public async Task<IActionResult> Request([FromBody] RentalEvent rentalEvent)
        {
            if (ModelState.IsValid)
            {
                _context.RentalEvents.Add(rentalEvent);
                await _context.SaveChangesAsync();

                return Ok(rentalEvent);
            }

            return BadRequest(ModelState);
        }
    }
}