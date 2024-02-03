using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PackagingController : Controller
    {
        private readonly ApplicationDbContext _context;
        public PackagingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var packagingList = _context.Packagings.ToList();
            return View(packagingList);
        }

        [HttpGet]
        public IActionResult Create()
        {
            Packaging packaging = new Packaging();
            return View(packaging);
        }

        [HttpPost]
        public IActionResult Create(Packaging packaging)
        {
            if (ModelState.IsValid)
            {

                _context.Packagings.Add(packaging);
                _context.SaveChanges();

                return Redirect("Index");
            }
            return View("Create", packaging);
        }

        [HttpPost]
        public IActionResult Edit(Packaging packaging)
        {
            if (ModelState.IsValid)
            {
                _context.Entry(packaging).State = EntityState.Modified;
                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            return View(packaging);
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            var thePackaging = _context.Packagings.Find(id);

            if (thePackaging != null)
            {
                _context.Packagings.Remove(thePackaging);
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
