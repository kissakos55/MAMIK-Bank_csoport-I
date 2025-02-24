using MAMIKBankBackEnd.DTO;
using MAMIKBankBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAMIKBankBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SzamlakController : ControllerBase
    {

        [HttpGet("{token}")]

        public async Task<IActionResult> Get(string token)
        {

            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                        return Ok(await cx.Szamlaks.ToListAsync());
                    }

                    else
                    {
                        return BadRequest("Nincs jogosultságod hozzá!");
                    }
                }
                catch (Exception ex)
                {
                    //return BadRquest(ex.Message);
                    return BadRequest
                (ex.InnerException?.Message);
                }
        }
        [HttpGet("{token},{ugyfelAzonosito}")]

        public async Task<IActionResult> Get(string token, int ugyfelAzonosito)
        {
            using (var cx = new MamikBankContext())
            {
                try
                {
                    if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Jogosultsag == 9)
                    {
                        return Ok(await cx.Szamlaks.FirstOrDefaultAsync(f => f.UgyfelAzonosito == ugyfelAzonosito));
                    }
                    else
                    {
                        return BadRequest("Nincs jogod hozzá!");
                    }
                }
                catch (Exception ex)
                {
                    //return BadRequest(ex.Message);
                    return BadRequest(ex.InnerException?.Message);
                }
            }
        }


        [HttpPost("{token}")]
        public async Task<IActionResult> Post(string token, Szamlak szamla)
        {
            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                        await cx.Szamlaks.AddAsync(szamla);
                        await cx.SaveChangesAsync();
                        return Ok("Új számla felvéve.");
                    }

                    else
                    {
                        return BadRequest("Nincs jogosultságod hozzá!");
                    }
                }
                catch (Exception ex)
                {
                    //return BadRquest(ex.Message);
                    return BadRequest
                (ex.InnerException?.Message);
                }
        }

        [HttpPut("{token}")]
        public IActionResult Put(string token, Szamlak szamlak)
        {
            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                        cx.Szamlaks.Update(szamlak);
                        cx.SaveChanges();
                        return Ok("A számla adatai módosítva..");
                    }

                    else
                    {
                        return BadRequest("Nincs jogosultságod hozzá!");
                    }
                }
                catch (Exception ex)
                {
                    //return BadRquest(ex.Message);
                    return BadRequest
                (ex.InnerException?.Message);
                }
        }

        [HttpDelete("{token},{id}")]
        public IActionResult Delete(string token, int id)
        {
            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                        cx.Szamlaks.Remove(new Szamlak { Id =id});
                        cx.SaveChanges();
                        return Ok("SZÁMLA adatai törölve.");
                    }

                    else
                    {
                        return BadRequest("Nincs jogosultságod hozzá!");
                    }
                }
                catch (Exception ex)
                {
                    //return BadRquest(ex.Message);
                    return BadRequest
                (ex.InnerException?.Message);
                }
        }
    }
}
