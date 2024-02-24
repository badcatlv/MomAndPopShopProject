// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using MomAndPopShop.Models;
using MomAndPopShop.Controllers;

namespace MomAndPopShop.Areas.Identity.Pages.Account
{
    public class LogoutModel : PageModel
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<LogoutModel> _logger;
        private readonly CartService _cartService;

        public LogoutModel(SignInManager<ApplicationUser> signInManager, ILogger<LogoutModel> logger, CartService cartService)
        {
            _signInManager = signInManager;
            _logger = logger;
            _cartService = cartService;
        }

        public async Task<IActionResult> OnPost(string returnUrl = null)
        {
            
            await _signInManager.SignOutAsync();
            _cartService.ClearCart();
           
            _logger.LogInformation("User logged out.");
            if (returnUrl != null)
            {
                //Add this line to clear the cart when the user logs out
                //_cartService.ClearCart();
                return LocalRedirect(returnUrl);
            }
            else
            {
                // This needs to be a redirect so that the browser performs a new
                // request and the identity for the user gets updated.
                return RedirectToPage();
            }

        }
    }
}
