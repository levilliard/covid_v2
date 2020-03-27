using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GheskioCovid19.Models
{
    public partial class emrContext : DbContext
    {
        public emrContext()
        {
        }

        public emrContext(DbContextOptions<emrContext> options)
            : base(options)
        {
        }

        public virtual DbSet<PatSite> PatSite { get; set; }
        public virtual DbSet<Patients> Patients { get; set; }
        public virtual DbSet<Questionnaire> Questionnaire { get; set; }
        public virtual DbSet<Resultat> Resultat { get; set; }
        public virtual DbSet<SigneSymptomes> SigneSymptomes { get; set; }
        public virtual DbSet<SigneSymptomesRef> SigneSymptomesRef { get; set; }
        public virtual DbSet<V_ENTETE_VISITE_COVID> EnteteVisite { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<V_ENTETE_VISITE_COVID>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("V_ENTETE_VISITE_COVID");

                /*
                entity.Property(e => e.PatNetId)
                    .HasColumnName("PAT_NET_ID")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DobDate)
                    .HasColumnName("DOB_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.EnrolDate)
                    .HasColumnName("ENROL_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.GenderDesc).HasColumnName("GENDER_DESC").HasMaxLength(60);

                entity.Property(e => e.GheskioId).HasColumnName("GHESKIO_ID");

                entity.Property(e => e.MoisEntry).HasColumnName("MOIS_ENTRY");

                entity.Property(e => e.SigleSite).HasColumnName("SIGLE_SITE");

                entity.Property(e => e.SiteDec).HasColumnName("SITE_DESC");
                */
            });

            modelBuilder.Entity<PatSite>(entity =>
            {
                entity.HasKey(e => new { e.PatNetId, e.SiteId, e.EntryDate });

                entity.ToTable("PAT_SITE");

                entity.Property(e => e.PatNetId)
                    .HasColumnName("PAT_NET_ID")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SiteId)
                    .HasColumnName("SITE_ID")
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.EntryDate)
                    .HasColumnName("ENTRY_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.CreationDtime)
                    .HasColumnName("CREATION_DTIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.CreationUser)
                    .HasColumnName("CREATION_USER")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Nihid).HasColumnName("NIHID");

                entity.Property(e => e.Preferred)
                    .HasColumnName("PREFERRED")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.TransDate)
                    .HasColumnName("TRANS_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.TransMed)
                    .HasColumnName("TRANS_MED")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TransSite)
                    .HasColumnName("TRANS_SITE")
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDtime)
                    .HasColumnName("UPDATE_DTIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasColumnName("UPDATE_USER")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Voided)
                    .HasColumnName("VOIDED")
                    .HasDefaultValueSql("((2))");

                entity.Property(e => e.VoidedDtime)
                    .HasColumnName("VOIDED_DTIME")
                    .HasColumnType("date");

                entity.Property(e => e.VoidedReason)
                    .HasColumnName("VOIDED_REASON")
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.VoidedUser)
                    .HasColumnName("VOIDED_USER")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.PatNet)
                    .WithMany(p => p.PatSite)
                    .HasForeignKey(d => d.PatNetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PAT_SITE_PATIENTS");
            });

            modelBuilder.Entity<Patients>(entity =>
            {
                entity.HasKey(e => e.PatNetId)
                    .HasName("XPKPATIENT");

                entity.ToTable("PATIENTS");

                entity.Property(e => e.PatNetId)
                    .HasColumnName("PAT_NET_ID")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Age).HasColumnName("AGE");

                entity.Property(e => e.Birthplace)
                    .HasColumnName("BIRTHPLACE")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Bloodtrans).HasColumnName("BLOODTRANS");

                entity.Property(e => e.ClinicId)
                    .IsRequired()
                    .HasColumnName("CLINIC_ID")
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.CreationDtime)
                    .HasColumnName("CREATION_DTIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.CreationUser)
                    .HasColumnName("CREATION_USER")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DobDate)
                    .HasColumnName("DOB_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.EnrolDate)
                    .HasColumnName("ENROL_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.GenderChoisi)
                    .HasColumnName("GENDER_CHOISI")
                    .HasMaxLength(4);

                entity.Property(e => e.GenderId)
                    .HasColumnName("GENDER_ID")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.LiveWithpartner).HasColumnName("LIVE_WITHPARTNER");

                entity.Property(e => e.MoisEntry).HasColumnName("MOIS_ENTRY");

                entity.Property(e => e.MothersLastname)
                    .HasColumnName("MOTHERS_LASTNAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MothersName)
                    .HasColumnName("MOTHERS_NAME")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Nihid).HasColumnName("NIHID");

                entity.Property(e => e.Number)
                    .HasColumnName("NUMBER")
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.OtherSiteId)
                    .HasColumnName("OTHER_SITE_ID")
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Pointage1)
                    .HasColumnName("POINTAGE_1")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Pointage2)
                    .HasColumnName("POINTAGE_2")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Pointage3)
                    .HasColumnName("POINTAGE_3")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ReferenceId)
                    .HasColumnName("REFERENCE_ID")
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.Remarks)
                    .HasColumnName("REMARKS")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.SiteId)
                    .IsRequired()
                    .HasColumnName("SITE_ID")
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Sqltodbf).HasColumnName("SQLTODBF");

                entity.Property(e => e.SqltodbfDate)
                    .HasColumnName("SQLTODBF_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.Status)
                    .HasColumnName("STATUS")
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.StatusDate)
                    .HasColumnName("STATUS_DATE")
                    .HasColumnType("date");

                entity.Property(e => e.Totalchildren).HasColumnName("TOTALCHILDREN");

                entity.Property(e => e.TypeNumber).HasColumnName("TYPE_NUMBER");

                entity.Property(e => e.UpdateDtime)
                    .HasColumnName("UPDATE_DTIME")
                    .HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasColumnName("UPDATE_USER")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Voided).HasColumnName("VOIDED");

                entity.Property(e => e.VoidedDtime)
                    .HasColumnName("VOIDED_DTIME")
                    .HasColumnType("date");

                entity.Property(e => e.VoidedReason)
                    .HasColumnName("VOIDED_REASON")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.VoidedUser)
                    .HasColumnName("VOIDED_USER")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Questionnaire>(entity =>
            {
                entity.HasKey(e => e.QuestionId);

                entity.ToTable("Questionnaire", "covid");

                entity.Property(e => e.QuestionId)
                    .HasColumnName("QuestionID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.QuestionDesc)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Voided)
                    .HasColumnName("voided")
                    .HasDefaultValueSql("((2))");
            });

            modelBuilder.Entity<Resultat>(entity =>
            {
                entity.ToTable("Resultat", "covid");

                entity.Property(e => e.DateResult).HasColumnType("date");

                entity.Property(e => e.DateVisite).HasColumnType("date");

                entity.Property(e => e.Nihid)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Result)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.HasOne(d => d.SigneSymptomes)
                    .WithMany(p => p.Resultat)
                    .HasForeignKey(d => d.SigneSymptomesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RS_SIGNES");
            });

            modelBuilder.Entity<SigneSymptomes>(entity =>
            {
                entity.ToTable("SigneSymptomes", "covid");

                entity.Property(e => e.DateQuestionNiveau1).HasColumnType("date");

                entity.Property(e => e.DateQuestionNiveau2).HasColumnType("date");

                entity.Property(e => e.DateRetour).HasColumnType("date");

                entity.Property(e => e.DateVisite).HasColumnType("date");

                entity.Property(e => e.GheskioIra)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InitialAgent)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Firstname)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Lastname)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.InitialPrestataireNiveau2)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatNetId)
                    .HasColumnName("PAT_NET_ID")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ScreeningDate).HasColumnType("date");

                entity.Property(e => e.SigneSymptome8).IsUnicode(false);

                entity.HasOne(d => d.PatNet)
                    .WithMany(p => p.SigneSymptomes)
                    .HasForeignKey(d => d.PatNetId)
                    .HasConstraintName("SS_PAT_NET");
            });

            modelBuilder.Entity<SigneSymptomesRef>(entity =>
            {
                entity.HasKey(e => e.SigneId);

                entity.ToTable("SigneSymptomesRef", "covid");

                entity.Property(e => e.SigneId)
                    .HasColumnName("SigneID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Symptome)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Voided)
                    .HasColumnName("voided")
                    .HasDefaultValueSql("((2))");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
