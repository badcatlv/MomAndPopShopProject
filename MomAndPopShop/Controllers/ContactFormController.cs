using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactFormController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactFormController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [HttpGet("{id}")]
        public async Task<IActionResult> Index(int id = 0)
        {
            if (id == 0)
            {
                return Ok(await _context.ContactForms.ToListAsync());
            }
            else
            {
                return Ok(await _context.ContactForms.FindAsync(id));
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] ContactForm contactForm)
        {
            if (ModelState.IsValid)
            {
                _context.ContactForms.Add(contactForm);
                await _context.SaveChangesAsync();

                return Ok(contactForm);
            }

            return BadRequest(ModelState);
        }

    }
}