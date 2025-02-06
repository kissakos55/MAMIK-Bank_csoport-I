using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MAMIKBankBackEnd.Models;

public partial class Szamlak
{
    public int Id { get; set; }

    public int SzamlaAzonosito { get; set; }

    public int UgyfelAzonosito { get; set; }

    public string Szamlatipus { get; set; } = null!;

    public string Penznem { get; set; } = null!;

    public int Egyenleg { get; set; }

    public DateTime NyitasiDatum { get; set; }

    public string Statusz { get; set; } = null!;

    public virtual Tranzakciok? Tranzakciok { get; set; }

    [JsonIgnore]
    public virtual Ugyfelek UgyfelAzonositoNavigation { get; set; } = null!;
}
