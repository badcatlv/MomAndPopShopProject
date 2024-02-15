using Microsoft.AspNetCore.Mvc;

namespace MomAndPopShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
