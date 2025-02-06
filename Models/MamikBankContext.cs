using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MAMIKBankBackEnd.Models;

public partial class MamikBankContext : DbContext
{
    public MamikBankContext()
    {
    }

    public MamikBankContext(DbContextOptions<MamikBankContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Felhasznalok> Felhasznaloks { get; set; }

    public virtual DbSet<Hitelkartyak> Hitelkartyaks { get; set; }

    public virtual DbSet<Szamlak> Szamlaks { get; set; }

    public virtual DbSet<Tranzakciok> Tranzakcioks { get; set; }

    public virtual DbSet<Ugyfelek> Ugyfeleks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("SERVER=localhost;PORT=3306;DATABASE=mamik_bank;USER=root;PASSWORD=;SSL MODE=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Felhasznalok>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("felhasznalok");

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.HasIndex(e => e.FelhasznaloNev, "FelhasznaloNev").IsUnique();

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Aktiv).HasColumnType("int(1)");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FelhasznaloNev).HasMaxLength(100);
            entity.Property(e => e.FenykepUtvonal).HasMaxLength(64);
            entity.Property(e => e.Hash)
                .HasMaxLength(64)
                .HasColumnName("HASH");
            entity.Property(e => e.Jogosultsag).HasColumnType("int(1)");
            entity.Property(e => e.RegisztracioDatuma)
                .HasDefaultValueSql("'current_timestamp()'")
                .HasColumnType("datetime");
            entity.Property(e => e.Salt)
                .HasMaxLength(64)
                .HasColumnName("SALT");
            entity.Property(e => e.TeljesNev).HasMaxLength(60);
        });

        modelBuilder.Entity<Hitelkartyak>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("hitelkartyak");

            entity.HasIndex(e => e.KartyaAzonosito, "kartya_azonosito").IsUnique();

            entity.HasIndex(e => e.UgyfelAzonosito, "ugyfel_azonosito");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.CvvKod)
                .HasColumnType("int(3)")
                .HasColumnName("CVV_kod");
            entity.Property(e => e.ElerhetoHitelkeret)
                .HasColumnType("int(11)")
                .HasColumnName("elerheto_hitelkeret");
            entity.Property(e => e.Hitelkeret)
                .HasColumnType("int(11)")
                .HasColumnName("hitelkeret");
            entity.Property(e => e.KartyaAzonosito)
                .HasColumnType("int(24)")
                .HasColumnName("kartya_azonosito");
            entity.Property(e => e.Kartyaszam)
                .HasColumnType("int(24)")
                .HasColumnName("kartyaszam");
            entity.Property(e => e.LejaratiDatum)
                .HasColumnType("date")
                .HasColumnName("lejarati_datum");
            entity.Property(e => e.UgyfelAzonosito)
                .HasColumnType("int(11)")
                .HasColumnName("ugyfel_azonosito");

            entity.HasOne(d => d.UgyfelAzonositoNavigation).WithMany(p => p.Hitelkartyaks)
                .HasPrincipalKey(p => p.UgyfelAzonosito)
                .HasForeignKey(d => d.UgyfelAzonosito)
                .HasConstraintName("hitelkartyak_ibfk_1");
        });

        modelBuilder.Entity<Szamlak>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("szamlak");

            entity.HasIndex(e => e.SzamlaAzonosito, "szamla_azonosito").IsUnique();

            entity.HasIndex(e => e.UgyfelAzonosito, "ugyfel_azonosito");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Egyenleg)
                .HasColumnType("int(10) unsigned")
                .HasColumnName("egyenleg");
            entity.Property(e => e.NyitasiDatum)
                .HasColumnType("date")
                .HasColumnName("nyitasi_datum");
            entity.Property(e => e.Penznem)
                .HasMaxLength(5)
                .HasColumnName("penznem");
            entity.Property(e => e.Statusz)
                .HasMaxLength(10)
                .HasColumnName("statusz");
            entity.Property(e => e.SzamlaAzonosito)
                .HasColumnType("int(24)")
                .HasColumnName("szamla_azonosito");
            entity.Property(e => e.Szamlatipus)
                .HasMaxLength(15)
                .HasColumnName("szamlatipus");
            entity.Property(e => e.UgyfelAzonosito)
                .HasColumnType("int(11)")
                .HasColumnName("ugyfel_azonosito");

            entity.HasOne(d => d.UgyfelAzonositoNavigation).WithMany(p => p.Szamlaks)
                .HasPrincipalKey(p => p.UgyfelAzonosito)
                .HasForeignKey(d => d.UgyfelAzonosito)
                .HasConstraintName("szamlak_ibfk_3");
        });

        modelBuilder.Entity<Tranzakciok>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tranzakciok");

            entity.HasIndex(e => e.SzamlaAzonosito, "szamla_azonosito").IsUnique();

            entity.HasIndex(e => e.TranzakcioAzonosito, "tranzakcio_azonosito");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.KedvezmenyezettSzamla)
                .HasColumnType("int(24)")
                .HasColumnName("kedvezmenyezett_szamla");
            entity.Property(e => e.Leiras)
                .HasMaxLength(250)
                .HasColumnName("leiras");
            entity.Property(e => e.Osszeg)
                .HasColumnType("int(10) unsigned")
                .HasColumnName("osszeg");
            entity.Property(e => e.SzamlaAzonosito)
                .HasColumnType("int(24)")
                .HasColumnName("szamla_azonosito");
            entity.Property(e => e.TranzakcioAzonosito)
                .HasColumnType("int(8)")
                .HasColumnName("tranzakcio_azonosito");
            entity.Property(e => e.TranzakcioDatuma)
                .HasColumnType("date")
                .HasColumnName("tranzakcio_datuma");
            entity.Property(e => e.TranzakcioTipusa)
                .HasMaxLength(15)
                .HasColumnName("tranzakcio_tipusa");

            entity.HasOne(d => d.SzamlaAzonositoNavigation).WithOne(p => p.Tranzakciok)
                .HasPrincipalKey<Szamlak>(p => p.SzamlaAzonosito)
                .HasForeignKey<Tranzakciok>(d => d.SzamlaAzonosito)
                .HasConstraintName("tranzakciok_ibfk_1");
        });

        modelBuilder.Entity<Ugyfelek>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("ugyfelek");

            entity.HasIndex(e => e.UgyfelAzonosito, "ugyfel_azonosito").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Lakcim)
                .HasMaxLength(80)
                .HasColumnName("lakcim");
            entity.Property(e => e.Nev)
                .HasMaxLength(40)
                .HasColumnName("nev");
            entity.Property(e => e.RegisztracioDatuma)
                .HasColumnType("date")
                .HasColumnName("regisztracio_datuma");
            entity.Property(e => e.SzemelyiIgazolvanySzam)
                .HasMaxLength(11)
                .HasColumnName("szemelyi_igazolvany_szam");
            entity.Property(e => e.SzuletesiDatum)
                .HasColumnType("date")
                .HasColumnName("szuletesi_datum");
            entity.Property(e => e.Telefonszam)
                .HasColumnType("int(11)")
                .HasColumnName("telefonszam");
            entity.Property(e => e.UgyfelAzonosito)
                .HasColumnType("int(11)")
                .HasColumnName("ugyfel_azonosito");

            entity.HasOne(d => d.UgyfelAzonositoNavigation).WithOne(p => p.Ugyfelek)
                .HasForeignKey<Ugyfelek>(d => d.UgyfelAzonosito)
                .HasConstraintName("ugyfelek_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
