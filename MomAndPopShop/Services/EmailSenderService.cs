using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using MomAndPopShop.Services;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace MomAndPopShop.Services;

public class EmailSenderService : IEmailSender
{
    private readonly ISendGridClient _sendGridClient;
    private readonly AuthMessageSenderOptions _authMessageSenderOptions;
    public EmailSenderService(ISendGridClient sendGridClient, IOptions<AuthMessageSenderOptions> authMessageSenderOptions)
    {
        _sendGridClient = sendGridClient;
        _authMessageSenderOptions = authMessageSenderOptions.Value;
    }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        var msg = new SendGridMessage()
        {
            From = new EmailAddress(_authMessageSenderOptions.SendGridUser, _authMessageSenderOptions.EmailName),
            Subject = subject,
            HtmlContent = htmlMessage
        };

        msg.AddTo(email);
        await _sendGridClient.SendEmailAsync(msg);
    }
}