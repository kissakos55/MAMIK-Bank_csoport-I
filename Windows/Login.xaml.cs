using BackEndWPF.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Security.Cryptography;

namespace BackEndWPF.Windows
{
    /// <summary>
    /// Interaction logic for Login.xaml
    /// </summary>
    public partial class Login : Window
    {
        public Login()
        {
            InitializeComponent();
        }

        private void Login_Button(object sender, RoutedEventArgs e)
        {
            //salt lekérés
            string salt = LoginService.getSalt(MainWindow.Client, usernameTextBox.Text);
            //hash előállítás
            string hash = CreateSHA256(passwordTextBox.Password + salt);
            MessageBox.Show(hash);
            //username+ hash -al login a végponthoz
            MainWindow.loggeduser = LoginService.login(MainWindow.Client, usernameTextBox.Text, hash);
            if (MainWindow.loggeduser != null)
            {
                MessageBox.Show("Bejelentkezett: " + MainWindow.loggeduser.name);
                this.Close();
            }
            else
            {
                MessageBox.Show("Hibás felhasználó név vagy jelszó.");
            }
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
    }
}
