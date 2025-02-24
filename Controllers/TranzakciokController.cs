using MAMIKBankBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MAMIKBankBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranzakciokController : ControllerBase
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
                        return Ok(await cx.Tranzakcioks.ToListAsync());
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
        
        [HttpGet("{token},{szamlaAzonosito}")]

        public async Task<IActionResult> Get(string token, int szamlaAzonosito)
        {
            using (var cx = new MamikBankContext())
            {
                try
                {
                    if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Jogosultsag == 9)
                    {
                        return Ok(await cx.Tranzakcioks.Where(f => f.SzamlaAzonosito == szamlaAzonosito).ToListAsync());
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
        

        [HttpGet("megtakaritas/{token},{szamlaAzonosito},{tranzakcioTipusa}")]

        public async Task<IActionResult> Get(string token, int szamlaAzonosito, string tranzakcioTipusa)
        {
            using (var cx = new MamikBankContext())
            {
                try
                {
                    if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Jogosultsag == 9)
                    {
                        return Ok(await cx.Tranzakcioks.Where(f => f.SzamlaAzonosito == szamlaAzonosito && f.TranzakcioTipusa==tranzakcioTipusa).SumAsync(f=>f.Osszeg));
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
        public async Task<IActionResult> Post(string token, Tranzakciok tranzakcio)
        {
            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                        await cx.Tranzakcioks.AddAsync(tranzakcio);
                        await cx.SaveChangesAsync();
                        return Ok("Új tranzakcio felvéve.");
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
        public IActionResult Put(string token, Tranzakciok tranzakcio)
        {
            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                        cx.Tranzakcioks.Update(tranzakcio);
                        cx.SaveChanges();
                        return Ok("A tranzakcio adatai módosítva..");
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
                        cx.Tranzakcioks.Remove(new Tranzakciok { Id = id });
                        cx.SaveChanges();
                        return Ok("Trnzakcio adatai törölve.");
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
