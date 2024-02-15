using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SeasoningController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SeasoningController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var seasoningList = await _context.Seasonings.ToListAsync();
            return Ok(seasoningList);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Seasoning seasoning)
        {
            if (ModelState.IsValid)
            {
                _context.Seasonings.Add(seasoning);
                await _context.SaveChangesAsync();

                return Ok(seasoning);
            }

            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] Seasoning seasoning)
        {
            if (id != seasoning.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                _context.Entry(seasoning).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(seasoning);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var theSeasoning = await _context.Seasonings.FindAsync(id);

            if (theSeasoning != null)
            {
                _context.Seasonings.Remove(theSeasoning);
                await _context.SaveChangesAsync();

                return Ok(theSeasoning);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
