using Duende.IdentityServer.EntityFramework.Options;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MomAndPopShop.Models;
using System.Drawing;
using OperationalStoreOptions = Duende.IdentityServer.EntityFramework.Options.OperationalStoreOptions;

namespace MomAndPopShop.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Popcorn> Popcorns { get; set; }
        public DbSet<Seasoning> Seasonings { get; set; }
        public DbSet<Sizes> Sizes { get; set; }
        public DbSet<Packaging> Packagings { get; set; }
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }


    }
}