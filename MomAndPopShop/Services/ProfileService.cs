using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using MomAndPopShop.Models;
using System.Security.Claims;

namespace MomAndPopShop.Services
{
    public class ProfileService : IProfileService
    {
        protected UserManager<ApplicationUser> mUserManager;

        public ProfileService(UserManager<ApplicationUser> userManager)
        {
            mUserManager = userManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            ApplicationUser user = await mUserManager.GetUserAsync(context.Subject);

            IList<string> roles = await mUserManager.GetRolesAsync(user);

            IList<Claim> roleClaims = new List<Claim>();
            foreach (string role in roles)
            {
                roleClaims.Add(new Claim(JwtClaimTypes.Role, role));
            }
            context.IssuedClaims.Add(new Claim(JwtClaimTypes.Name, user.UserName));
            context.IssuedClaims.AddRange(roleClaims);
            //Add more claims as you need
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            return Task.CompletedTask;
        }
    }
}
