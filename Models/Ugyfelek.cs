using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MAMIKBankBackEnd.Models;

public partial class Ugyfelek
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
    public virtual ICollection<Hitelkartyak>? Hitelkartyaks { get; set; } = new List<Hitelkartyak>();

    public virtual ICollection<Szamlak>? Szamlaks { get; set; } = new List<Szamlak>();

    public virtual Felhasznalok? UgyfelAzonositoNavigation { get; set; } = null!;
}
