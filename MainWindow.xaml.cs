﻿using BackEndWPF.Classes;
using BackEndWPF.Service;
using BackEndWPF.Windows;
using System.Net.Http;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace BackEndWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public static HttpClient Client;
        public static LoggedUser loggeduser;
        public MainWindow()
        {
            InitializeComponent();
            Client = new HttpClient();
            Client.BaseAddress = new Uri("http://localhost:5000");
        }

        private void LoginWindows_menu(object sender, RoutedEventArgs e)
        {
            Login login = new Login();
            login.Show();
        }

        private void Felhasznalok_menu(object sender, RoutedEventArgs e)
        {
            Felhasznalok felhasznalok = new Felhasznalok();
            felhasznalok.Show();
        }
    }
}