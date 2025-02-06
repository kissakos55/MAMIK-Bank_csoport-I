﻿using MAMIKBankBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MAMIKBankBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JelszoController : ControllerBase
    {
        [HttpPost("{loginName},{oldPassword},{newPassword}")]

        public async Task<IActionResult> JelszoMosositas(string loginName, string oldPassword, string newPassword)
        {
            try
            {
                using (var context = new MamikBankContext())
                {
                    Felhasznalok? user = context.Felhasznaloks.FirstOrDefault(f => f.FelhasznaloNev == loginName);
                    if (user != null)
                    {
                        if (Program.CreateSHA256(oldPassword) == user.Hash)
                        {
                            user.Hash = Program.CreateSHA256(newPassword);
                            context.Felhasznaloks.Update(user);
                            await context.SaveChangesAsync();
                            return Ok("A jelszó módosítása sikeresen megtörtént.");
                        }
                        else
                        {
                            return StatusCode(201, "Hibás a régi jelszó!");
                        }
                    }
                    else
                    {
                        return BadRequest("Nincs ilyen nevű felhasználó!");
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{Email}")]
        public async Task<IActionResult> ElfelejtettJelszo(string Email)
        {
            using (var context = new MamikBankContext())
            {
                try
                {
                    var user = context.Felhasznaloks.FirstOrDefault(f => f.Email == Email);
                    if (user != null)
                    {
                        string jelszo = Program.GenerateSalt().Substring(0, 16);
                        user.Hash = Program.CreateSHA256(Program.CreateSHA256(jelszo + user.Salt));
                        context.Felhasznaloks.Update(user);
                        await context.SaveChangesAsync();
                        Program.SendEmail(user.Email, "Elfelejtett jelszó", "Az új jelszava: " + jelszo);
                        return Ok("E-mail küldése megtörtént.");
                    }
                    else
                    {
                        return StatusCode(210, "Nincs ilyen e-Mail cím!");
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(211, ex.Message);
                }
            }
        }


    }
}
