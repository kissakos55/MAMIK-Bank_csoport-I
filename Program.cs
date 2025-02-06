
using MAMIKBankBackEnd.Models;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;

namespace MAMIKBankBackEnd
{

    public class Program
    {
        public static int SaltLength = 64;
        public static Dictionary<string, Felhasznalok> LoggedInUsers = new Dictionary<string, Felhasznalok>();
        public static async Task SendEmail(string mailAddressTo, string subject, string body)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("noreplykko123@gmail.com");
            mail.To.Add(mailAddressTo);
            mail.Subject = subject;
            mail.Body = body;

            /*System.Net.Mail.Attachment attachment;
            attachment = new System.Net.Mail.Attachment("");
            mail.Attachments.Add(attachment);*/

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("noreplykko123@gmail.com", "ddbshcyopzuzbfbe");

            SmtpServer.EnableSsl = true;

            await SmtpServer.SendMailAsync(mail);

        }


        public static string GenerateSalt()
        {
            Random random = new Random();
            string karakterek = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            string salt = "";
            for (int i = 0; i < SaltLength; i++)
            {
                salt += karakterek[random.Next(karakterek.Length)];
            }
            return salt;
        }

        public static string CreateSHA256(string input)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] data = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sBuilder = new StringBuilder();
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }
                return sBuilder.ToString();
            }
        }


        public static void Main(string[] args)
        {
            Program.LoggedInUsers["token"] = new Felhasznalok { Jogosultsag = 9 };

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(c => { c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()); });





            // Add services to the container.
            /*builder.WebHost.ConfigureKestrel(options =>
            {
                options.ListenAnyIP(5000);
                options.ListenAnyIP(5001, ListenOptions =>
                {
                    ListenOptions.UseHttps("certificate.pfx", "YourPassword");
                });
            });*/


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }

    }
}
//Scaffold-DbContext "SERVER=localhost;PORT=3306;DATABASE=mamik_bank;USER=root;PASSWORD=;SSL MODE=none;" mysql.entityframeworkcore -outputdir Models -f