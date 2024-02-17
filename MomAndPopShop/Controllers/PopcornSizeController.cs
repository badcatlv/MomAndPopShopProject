using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PopcornSizeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PopcornSizeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [HttpGet("{id}")]
        public async Task<IActionResult> Index(int id = 0)
        {
            if (id == 0)
            {
                return Ok(await _context.PopcornSizes.ToListAsync());
            }
            else
            {
                return Ok(await _context.PopcornSizes.FindAsync(id));
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] PopcornSize popcornSize)
        {
            if (ModelState.IsValid)
            {
                _context.PopcornSizes.Add(popcornSize);
                await _context.SaveChangesAsync();

                return Ok(popcornSize);
            }

            return BadRequest(ModelState);
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] PopcornSize popcornSize)
        {
            if (id != popcornSize.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                _context.Entry(popcornSize).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(popcornSize);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var thePopcornSize = await _context.PopcornSizes.FindAsync(id);

            if (thePopcornSize != null)
            {
                _context.PopcornSizes.Remove(thePopcornSize);
                await _context.SaveChangesAsync();

                return Ok(thePopcornSize);
            }
            else
            {
                return NotFound();
            }
        }
    }
}