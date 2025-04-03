namespace BackEndWPF.Classes
{
    public class LoggedUser
    {

        public string name { get; set; }

        public string email { get; set; }

        public int? permission { get; set; }

        public string profilePicturePath { get; set; }

        public string token { get; set; }

        public int ugyfelAzonosito { get; set; }

        public LoggedUser(string name, string email, int? permission, string profilePicturePath, string token, int ugyfelAzonosito)
        {
            this.name = name;
            this.email = email;
            this.permission = permission;
            this.profilePicturePath = profilePicturePath;
            this.token = token;
            this.ugyfelAzonosito = ugyfelAzonosito;
        }
    }
}
