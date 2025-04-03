using BackEndWPF.Classes;
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

namespace BackEndWPF.Service
{
    /// <summary>
    /// Interaction logic for Felhasznalok.xaml
    /// </summary>
    public partial class Felhasznalok : Window
    {
        public Felhasznalok()
        {
            InitializeComponent();
            Adatokbetoltese();
        }
        public async void Adatokbetoltese()
        {
            usersDataGrid.ItemsSource = await UsersService.getUsers(MainWindow.Client);
        }
    }
}
