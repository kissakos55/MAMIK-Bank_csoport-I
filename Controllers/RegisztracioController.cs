using MAMIKBankBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAMIKBankBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisztracioController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Regisztracio(Felhasznalok felhasznalok)
        {
            using (var cx = new MamikBankContext())
            {
                try
                {
                    if (cx.Felhasznaloks.FirstOrDefault(f => f.FelhasznaloNev == felhasznalok.FelhasznaloNev) != null)
                    {
                        return Ok("Már létezik ilyen felhasználónév!");
                    }
                    if (cx.Felhasznaloks.FirstOrDefault(f => f.Email == felhasznalok.Email) != null)
                    {
                        return Ok("Ezzel az E-mail címmel már regisztráltak!");
                    }
                    felhasznalok.Jogosultsag = 1;
                    felhasznalok.Aktiv = 0;
                    felhasznalok.Hash = Program.CreateSHA256(felhasznalok.Hash);
                    await cx.Felhasznaloks.AddAsync(felhasznalok);
                   await cx.SaveChangesAsync();

                    Program.SendEmail(felhasznalok.Email, "Regisztráció", $"http://" +
                        $"localhost:5000/api/Regisztracio?felhasznaloNev=f&email=e{felhasznalok.FelhasznaloNev}&email={felhasznalok.Email}");
                    return Ok("Sikeres regisztráció.Fejezze be a regisztrációját az e-mail címére küldött link segítségével");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }

            }

        }
        [HttpGet]
        public async Task<IActionResult>Regisztraciovege(string felhasznaloNev,string email)
        {
           using(var cx=new MamikBankContext())
            {
                Felhasznalok felhasznalok = await cx.Felhasznaloks.FirstOrDefaultAsync(f => f.FelhasznaloNev == felhasznaloNev && f.Email == email);
                if (felhasznalok == null)
                {
                   
                    return Ok("Sikertelen a regisztráció befejezése!");

                }
                else
                {
                    felhasznalok.Aktiv = 1;
                    cx.Felhasznaloks.Update(felhasznalok);
                    return Ok("Sikeresen megtörtént a regisztráció!");
                }
            }
           

        }
    }
}
