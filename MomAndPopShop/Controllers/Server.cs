using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using MomAndPopShop.Data;
using MomAndPopShop.Models;
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
               // string priceSku = popcorn.PopcornItem.StripeSku;
                int popQuantity = popcorn.Quantity;
                //long popPrice = (long)popcorn.PopcornItem.PopcornPrice * 100;
                var decPrice = popcorn.PopcornItem.PopcornPrice * 100;


                lineItems.Add(new SessionLineItemOptions
                {
                    //Price = priceSku,
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = popcorn.PopcornItem.Name,
                            Description = popcorn.PopcornItem.Description,
                        },
                        UnitAmountDecimal= decPrice,               
                        //UnitAmount = popPrice,
                    },
                    
                    //Price = popPrice,
                    Quantity = popQuantity,
                });;

            }


            var domain = "https://localhost:44416";
            var options = new SessionCreateOptions
            {
                //CustomerEmail = _context.Users.FirstOrDefault().Email,
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = "https://localhost:44416/successful",
                CancelUrl = "https://localhost:44416/stripe-app",
            };

            var service = new SessionService();
            Session session = service.Create(options);

           /* string userId = _context.Users.FirstOrDefault().Id;
            Order order = new Order { UserId = userId , Items = cart.Items };
            _context.Orders.Add(order);*/

            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);


        }
    }
}
