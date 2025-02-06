using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MAMIKBankBackEnd.Models;

public partial class Hitelkartyak
{
    public int Id { get; set; }

    public int KartyaAzonosito { get; set; }

    public int UgyfelAzonosito { get; set; }

    public int Kartyaszam { get; set; }

    public DateTime LejaratiDatum { get; set; }

    public int CvvKod { get; set; }

    public int Hitelkeret { get; set; }

    public int ElerhetoHitelkeret { get; set; }

    [JsonIgnore]
    public virtual Ugyfelek UgyfelAzonositoNavigation { get; set; } = null!;
}
