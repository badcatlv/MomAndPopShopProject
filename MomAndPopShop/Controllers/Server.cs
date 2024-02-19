using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using MomAndPopShop.Data;
using Stripe;
using Stripe.Checkout;

public class StripeOptions
{
    public string option { get; set; }
}

namespace MomAndPopShop.Controllers
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebHost.CreateDefaultBuilder(args)
              .UseUrls("http://0.0.0.0:4242")
              .UseWebRoot("public")
              .UseStartup<Startup>()
              .Build()
              .Run();
        }
    }

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddNewtonsoftJson();
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // This is your test secret API key.
            StripeConfiguration.ApiKey = "sk_test_51OiOb1A8iioFBT6WORuFIleOIpw8W3IJjPEhyoZDfjVq90Ro2HJ6NgKWwOvFwDPbKFc2EMl6JJvrWW7oZrWMl263002z9z0wre";
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
            app.UseRouting();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }

    [Route("create-checkout-session")]
    [ApiController]
    public class CheckoutApiController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly CartService _cartService;

        public CheckoutApiController(CartService cartService, ApplicationDbContext context)
        {
            _cartService = cartService;
            _context = context;
        }

        [HttpPost]
        public ActionResult Create()
        {
            var cart = _cartService.GetCart();
            if (cart.Items.Count == 0)
            {
                return BadRequest(new StripeOptions { option = "Cart is empty" });
            }
            var lineItems = new List<SessionLineItemOptions>();

            foreach (var popcorn in cart.Items)
            {
                if (popcorn.PopcornItem.StripeSku == null)
                {
                    return BadRequest(new StripeOptions { option = "Stripe SKU is required. Please log in to Stripe and view the Product Catalog" });
                }
                string priceSku = popcorn.PopcornItem.StripeSku;
                int popQuantity = popcorn.Quantity;

                lineItems.Add(new SessionLineItemOptions
                {
                    Price = priceSku,
                    Quantity = popQuantity,
                });

            }


            //var lineItems = new List<SessionLineItemOptions>();
            var domain = "http://localhost:4242";
            var options = new SessionCreateOptions
            {
                CustomerEmail = _context.Users.FirstOrDefault().Email,
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = "https://localhost:44416",
                CancelUrl = domain + "?canceled=true",
            };

            var service = new SessionService();
            Session session = service.Create(options);

            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);

        }
    }
}
/*foreach (var item in options.LineItems)
{
    if (item.Price != priceSku)
    {

    }
} else { }*/

/*var domain = "http://localhost:4242";
var options = new SessionCreateOptions
{
    LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                      Price = priceSku,
                      Quantity = 1,
                  },
                },
    Mode = "payment",
    SuccessUrl = "https://localhost:44416",
    CancelUrl = domain + "?canceled=true",
};
var service = new SessionService();
Session session = service.Create(options);

Response.Headers.Add("Location", session.Url);
return new StatusCodeResult(303);*/