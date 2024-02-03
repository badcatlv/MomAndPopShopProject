using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop.Data;
using MomAndPopShop.Models;
using System.Drawing;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SizesController : Controller
    {
        private readonly ApplicationDbContext _context;
        public SizesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var sizeList = _context.Sizes.ToList();
            return View(sizeList);
        }

        [HttpGet]
        public IActionResult Create()
        {
            Sizes sizes = new Sizes();
            return View(sizes);
        }

        [HttpPost]
        public IActionResult Create(Sizes sizes)
        {
            if (ModelState.IsValid)
            {

                _context.Sizes.Add(sizes);
                _context.SaveChanges();

                return Redirect("Index");
            }
            return View("Create", sizes);
        }

        [HttpPost]
        public IActionResult Edit(Sizes sizes)
        {
            if (ModelState.IsValid)
            {
                _context.Entry(sizes).State = EntityState.Modified;
                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            return View(sizes);
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            var theSizes = _context.Sizes.Find(id);

            if (theSizes != null)
            {
                _context.Sizes.Remove(theSizes);
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
