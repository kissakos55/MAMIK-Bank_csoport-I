namespace MAMIKBankBackEnd.DTO
{
    public class UgyfelekDTO
    {
        public int Id { get; set; }

        public int UgyfelAzonosito { get; set; }

        public string Nev { get; set; } = null!;

        public DateTime SzuletesiDatum { get; set; }

        public string SzemelyiIgazolvanySzam { get; set; } = null!;

        public string Lakcim { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int Telefonszam { get; set; }

        public DateTime RegisztracioDatuma { get; set; }
    }
}
