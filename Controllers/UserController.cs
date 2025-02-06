using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MAMIKBankBackEnd.Models;
using MAMIKBankBackEnd.DTO;
using Microsoft.EntityFrameworkCore;

namespace MAMIKBankBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("UserEmailName/{token}")]

        public async Task<IActionResult>
            GetUserNameEmail(string token)
        {
            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                        return Ok(await cx.Felhasznaloks.Select(f =>
                        (new UserEmailNameDTO
                        {
                            Email = f.Email,
                            TeljesNev = f.TeljesNev
                        })).ToListAsync());
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
                            return Ok(await cx.Felhasznaloks.ToListAsync());
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
        [HttpGet("{token},{id}")]

        public async Task<IActionResult> Get(string token, int id)
        {
            using (var cx = new MamikBankContext())
            {
                try
                {
                    if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Jogosultsag == 9)
                    {
                        return Ok(await cx.Felhasznaloks.FirstOrDefaultAsync(f => f.Id == id));
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
        public async Task<IActionResult> Post(string token, Felhasznalok user)
        {
            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                        await cx.Felhasznaloks.AddAsync(user);
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
        public IActionResult Put(string token, Felhasznalok user)
        {
            using (var cx = new MamikBankContext())
                try
                {
                    if (Program.LoggedInUsers.ContainsKey
                        (token) && Program.LoggedInUsers
                        [token].Jogosultsag == 9)
                    {
                       cx.Felhasznaloks.Update(user);
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
                         cx.Felhasznaloks.Remove(new Felhasznalok { Id = id });
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
