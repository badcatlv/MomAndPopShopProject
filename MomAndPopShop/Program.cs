using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using MomAndPopShop;
using MomAndPopShop.Data;
using MomAndPopShop.Models;
using MomAndPopShop.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using Stripe;

StripeConfiguration.ApiKey = "sk_test_51OiOb1A8iioFBT6WORuFIleOIpw8W3IJjPEhyoZDfjVq90Ro2HJ6NgKWwOvFwDPbKFc2EMl6JJvrWW7oZrWMl263002z9z0wre";

var optionsProduct = new ProductCreateOptions
{
    Name = "Starter Subscription",
    Description = "$12/Month subscription",
};
var serviceProduct = new ProductService();
Product product = serviceProduct.Create(optionsProduct);
Console.Write("Success! Here is your starter subscription product id: {0}\n", product.Id);

var optionsPrice = new PriceCreateOptions
{
    UnitAmount = 1200,
    Currency = "usd",
    Recurring = new PriceRecurringOptions
    {
        Interval = "month",
    },
    Product = product.Id
};
var servicePrice = new PriceService();
Price price = servicePrice.Create(optionsPrice);
Console.Write("Success! Here is your starter subscription price id: {0}\n", price.Id);

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

builder.Services.AddScoped<IFileService, MomAndPopShop.Services.FileService>();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.AddHttpContextAccessor();
builder.Services.AddTransient<CartService>();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSession();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=ProductHome}/{action=GetProductHome}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html"); 

using(var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var roles = new[] { "Admin", "Manager", "User" };

    foreach(var role in roles)
    {
        if(!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

using (var scope = app.Services.CreateScope())
{
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

    string email = "mom.and.popcorn.shop@gmail.com";
    string password = "Admin@123";

    if(await userManager.FindByEmailAsync(email) == null)
    {
        var user = new ApplicationUser();
        user.UserName = email;
        user.Email = email;
        user.EmailConfirmed = true;

        await userManager.CreateAsync(user, password);

        await userManager.AddToRoleAsync(user, "Admin");
    }
}

app.Run();
