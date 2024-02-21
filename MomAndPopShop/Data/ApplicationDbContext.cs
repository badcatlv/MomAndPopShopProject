using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MomAndPopShop.Models;
using OperationalStoreOptions = Duende.IdentityServer.EntityFramework.Options.OperationalStoreOptions;

namespace MomAndPopShop.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Popcorn> Popcorns { get; set; }
        public DbSet<Seasoning> Seasonings { get; set; }
        public DbSet<PopcornSize> PopcornSizes { get; set; }
        public DbSet<Packaging> Packagings { get; set; }
        public DbSet<RentalEvent> RentalEvents { get; set; }
        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<CustomerReview> CustomerReviews { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Cart> Carts { get; set; }

        public DbSet<ContactForm> ContactForms { get; set; }
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            /*builder.Entity<CartItem>()
                .HasOne(e => e.PopcornItem);

            builder.Entity<Cart>()
                .HasMany(b => b.Items);*/

            base.OnModelCreating(builder);
        }

    }
}