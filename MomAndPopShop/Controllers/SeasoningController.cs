using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;
using System.Threading.Tasks;

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
        [HttpGet("{id}")]
        public async Task<IActionResult> Index(int id = 0)
        {
            if (id == 0)
            {
                return Ok(await _context.Seasonings.ToListAsync());
            }
            else
            {
                return Ok(await _context.Seasonings.FindAsync(id));
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetSeasoning()
        {
            var seasoning = await _context.Seasonings.ToListAsync();
            if (_context.Seasonings == null)
            {
                return NotFound("No Items.");
            }

            return Ok(seasoning);
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

        [HttpPut("edit/{id}")]
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

        [HttpDelete("delete/{id}")]
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