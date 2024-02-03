using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PopcornController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PopcornController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var popcornList = _context.Popcorns.ToList();
            return View(popcornList);
        }

        [HttpGet]
        public IActionResult Create()
        {
            Popcorn popcorn = new Popcorn();
            return View(popcorn);
        }

        [HttpPost]
        public IActionResult Create(Popcorn popcorn)
        {
            if (ModelState.IsValid)
            {

                _context.Popcorns.Add(popcorn);
                _context.SaveChanges();

                return Redirect("Index");
            }
            return View("Create", popcorn);
        }

        [HttpPost]
        public IActionResult Edit(Popcorn popcorn)
        {
            if (ModelState.IsValid)
            {
                _context.Entry(popcorn).State = EntityState.Modified;
                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            return View(popcorn);
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            var thePopcorn = _context.Popcorns.Find(id);

            if (thePopcorn != null)
            {
                _context.Popcorns.Remove(thePopcorn);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            else
            {
                return NotFound();
            }
        }
    }
}
