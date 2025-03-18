using MAMIKBankBackEnd.DTO;
using MAMIKBankBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MAMIKBankBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace MAMIKBankBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UgyfelekController : ControllerBase
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
                        return Ok(await cx.Ugyfeleks.ToListAsync());
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

        [HttpGet("/Full/{token}")]

        public async Task<IActionResult> GetFull(string token)
        {

            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                        return Ok(await cx.Ugyfeleks.Include(f => f.Hitelkartyaks).Include(f => f.Szamlaks).ToListAsync());
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
        /*

        [HttpGet("{token},{ugyfelAzon}")]

        public async Task<IActionResult> Get(string token, int ugyfelAzon)
        {
            using (var cx = new MamikBankContext())
            {
                try
                {
                    if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Jogosultsag == 9)
                    {
                        return Ok(await cx.Ugyfeleks.FirstOrDefaultAsync(f => f.UgyfelAzonosito == ugyfelAzon ));
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
        */
        [HttpGet("{token},{ugyfelAzon}")]

        public async Task<IActionResult> Get(string token, int ugyfelAzon)
        {
            using (var cx = new MamikBankContext())
            {
                try
                {
                    if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Jogosultsag == 9)
                    {
                        return Ok(await cx.Ugyfeleks.Select(f=>new UgyfelekDTO {Id=f.Id, UgyfelAzonosito=f.UgyfelAzonosito, Nev=f.Nev, SzuletesiDatum=f.SzuletesiDatum,SzemelyiIgazolvanySzam=f.SzemelyiIgazolvanySzam,Lakcim=f.Lakcim,Email=f.Email,Telefonszam=f.Telefonszam,RegisztracioDatuma=f.RegisztracioDatuma }).FirstOrDefaultAsync(f => f.UgyfelAzonosito == ugyfelAzon));
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
        public async Task<IActionResult> Post(string token, Ugyfelek ugyfel)
        {
            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                        await cx.Ugyfeleks.AddAsync(ugyfel);
                        await cx.SaveChangesAsync();
                        return Ok("Új felhasználó felvéve.");
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
        public IActionResult Put(string token, Ugyfelek ugyfel)
        {
            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                        cx.Ugyfeleks.Update(ugyfel);
                        cx.SaveChanges();
                        return Ok("A felhasználó adatai módosítva..");
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
                        cx.Ugyfeleks.Remove(new Ugyfelek { Id = id });
                        cx.SaveChanges();
                        return Ok("Új felhasználó adatai törölve.");
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
