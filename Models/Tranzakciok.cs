using System;
using System.Collections.Generic;

namespace MAMIKBankBackEnd.Models;

public partial class Tranzakciok
{
    public int Id { get; set; }

    public int TranzakcioAzonosito { get; set; }

    public int SzamlaAzonosito { get; set; }

    public string TranzakcioTipusa { get; set; } = null!;

    public int Osszeg { get; set; }

    public DateTime TranzakcioDatuma { get; set; }

    public int KedvezmenyezettSzamla { get; set; }

    public string Leiras { get; set; } = null!;

    public virtual Szamlak SzamlaAzonositoNavigation { get; set; } = null!;
}
