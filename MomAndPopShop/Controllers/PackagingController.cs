using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;
using System.Threading.Tasks;

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
        [HttpGet("{id}")]
        public async Task<IActionResult> Index(int id = 0)
        {
            if (id == 0)
            {
                return Ok(await _context.Packagings.ToListAsync());
            }
            else
            {
                return Ok(await _context.Packagings.FindAsync(id));
            }
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

        [HttpPut("edit/{id}")]
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

        [HttpDelete("delete/{id}")]
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