using System;
using System.Collections.Generic;

namespace GheskioCovid19.Models
{
    public partial class Patients
    {
        public Patients()
        {
            PatSite = new HashSet<PatSite>();
            SigneSymptomes = new HashSet<SigneSymptomes>();
        }

        public string PatNetId { get; set; }
        public DateTime EnrolDate { get; set; }
        public string SiteId { get; set; }
        public string ClinicId { get; set; }
        public int? Nihid { get; set; }
        public int? TypeNumber { get; set; }
        public string Number { get; set; }
        public DateTime? DobDate { get; set; }
        public short? Age { get; set; }
        public short? MoisEntry { get; set; }
        public string MothersName { get; set; }
        public string MothersLastname { get; set; }
        public int? Bloodtrans { get; set; }
        public short? Totalchildren { get; set; }
        public int? LiveWithpartner { get; set; }
        public string GenderId { get; set; }
        public string ReferenceId { get; set; }
        public string Birthplace { get; set; }
        public string Remarks { get; set; }
        public short? Sqltodbf { get; set; }
        public DateTime? SqltodbfDate { get; set; }
        public string Status { get; set; }
        public DateTime? StatusDate { get; set; }
        public string Pointage1 { get; set; }
        public string Pointage2 { get; set; }
        public string Pointage3 { get; set; }
        public string CreationUser { get; set; }
        public DateTime? CreationDtime { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? UpdateDtime { get; set; }
        public string VoidedUser { get; set; }
        public DateTime? VoidedDtime { get; set; }
        public short? Voided { get; set; }
        public string VoidedReason { get; set; }
        public string GenderChoisi { get; set; }
        public string OtherSiteId { get; set; }

        public virtual ICollection<PatSite> PatSite { get; set; }
        public virtual ICollection<SigneSymptomes> SigneSymptomes { get; set; }
    }
}
