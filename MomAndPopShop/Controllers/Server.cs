using System.Collections.Generic;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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
        [HttpPost]
        public ActionResult Create()
        {
            var domain = "https://localhost:44416";
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    Price = "price_1OkFx4A8iioFBT6Wp1DRaMaK",
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
            return new StatusCodeResult(303);
        }
    }
}