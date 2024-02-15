using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PackagingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PackagingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var packagingList = await _context.Packagings.ToListAsync();
            return Ok(packagingList);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Packaging packaging)
        {
            if (ModelState.IsValid)
            {
                _context.Packagings.Add(packaging);
                await _context.SaveChangesAsync();

                return Ok(packaging);
            }

            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] Packaging packaging)
        {
            if (id != packaging.Id)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                _context.Entry(packaging).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(packaging);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var thePackaging = await _context.Packagings.FindAsync(id);

            if (thePackaging != null)
            {
                _context.Packagings.Remove(thePackaging);
                await _context.SaveChangesAsync();

                return Ok(thePackaging);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
