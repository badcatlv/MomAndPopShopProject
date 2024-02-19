using Duende.IdentityServer.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MomAndPopShop.Models
{
    public class ContactForm
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 50 characters")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Email must be between 3 and 50 characters")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Phone Number is required")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Phone Number must be between 3 and 20 characters")]
        public string? PhoneNumber { get; set; }

        [Required(ErrorMessage = "Message is required")]
        [StringLength(500, MinimumLength = 3, ErrorMessage = "Message must be between 3 and 500 characters")]
        public string? Message { get; set; }

        public ContactForm() { }

        public ContactForm(string name, string email, string phoneNumber, string message)
        {
            Name = name;
            Email = email;
            PhoneNumber = phoneNumber;
            Message = message;
        }
    }
}
