using BackEndWPF.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace BackEndWPF.Service
{
    public static class UsersService
    {
        public static async Task<List<Felhasznalok>> getUsers(HttpClient client)
        {
            try
            {
                var lista = await client.GetFromJsonAsync<List<Felhasznalok>>("api/User?uID=" + MainWindow.loggeduser.token);
                MessageBox.Show("db" + lista.Count);
                return lista;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        
        }
}

