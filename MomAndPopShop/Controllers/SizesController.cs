using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SizesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SizesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var sizesList = await _context.Sizes.ToListAsync();
            return Ok(sizesList);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Sizes sizes)
        {
            if (ModelState.IsValid)
            {
                _context.Sizes.Add(sizes);
                await _context.SaveChangesAsync();

                return Ok(sizes);
            }

            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] Sizes sizes)
        {
            if (id != sizes.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                _context.Entry(sizes).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(sizes);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var theSizes = await _context.Sizes.FindAsync(id);

            if (theSizes != null)
            {
                _context.Sizes.Remove(theSizes);
                await _context.SaveChangesAsync();

                return Ok(theSizes);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
