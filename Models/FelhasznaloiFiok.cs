using System;
using System.Collections.Generic;

namespace MAMIKBankBackEnd.Models;

public partial class FelhasznaloiFiok
{
    public int Id { get; set; }

    public int UgyfelId { get; set; }

    public string Felhasznalonev { get; set; } = null!;

    public string Jelszo { get; set; } = null!;

    public DateTime UtolsoBelepes { get; set; }

    public virtual Ugyfelek Ugyfel { get; set; } = null!;
}
