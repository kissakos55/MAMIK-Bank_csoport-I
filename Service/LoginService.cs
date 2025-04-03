using BackEndWPF.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;

namespace BackEndWPF.Service
{
    public static class LoginService
    {
        public static string getSalt(HttpClient client, String username)
        {
           string uri = $"{client.BaseAddress}api/Login/GetSalt/{username}";
            try
            {
                var request = client.PostAsync(uri, null).Result;
                string salt = request.Content.ReadAsStringAsync().Result;
                return salt;
            }
            catch (Exception e)
            {
                return "getSalt Hiba:" + e.Message;
            }
        }
        public static LoggedUser login(HttpClient client, String username, String hash)
        {
            string url = $"{client.BaseAddress}api/Login/";
            LoginUser user = new LoginUser(username, hash);
            string json = JsonSerializer.Serialize(user);
            MessageBox.Show(json);
            var request = new StringContent(json, Encoding.UTF8, "application/json");
            var response = client.PostAsync(url, request).Result;
            try
            {
                var jsonuser = response.Content.ReadAsStringAsync().Result;
                MessageBox.Show(jsonuser);
                LoggedUser loggeduser = JsonSerializer.Deserialize<LoggedUser>(jsonuser);
                return loggeduser;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
