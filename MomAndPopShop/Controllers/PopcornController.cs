using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PopcornController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PopcornController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        [HttpGet("{id}")]
        public async Task<IActionResult> Index(int id = 0)
        {
            if (id == 0)
            {
                return Ok(await _context.Popcorns.ToListAsync());
            }
            else
            {
                return Ok(await _context.Popcorns.FindAsync(id));
            }

        }



        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Popcorn popcorn)
        {
            if (ModelState.IsValid)
            {
                _context.Popcorns.Add(popcorn);
                await _context.SaveChangesAsync();

                return Ok(popcorn); 
            }

            return BadRequest(ModelState);
        }


        [HttpPut("edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] Popcorn popcorn)
        {
            if (id != popcorn.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                _context.Entry(popcorn).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(popcorn); 
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var thePopcorn = await _context.Popcorns.FindAsync(id);

            if (thePopcorn != null)
            {
                _context.Popcorns.Remove(thePopcorn);
                await _context.SaveChangesAsync();

                return Ok(thePopcorn); 
            }
            else
            {
                return NotFound();
            }
        }
    }
}
