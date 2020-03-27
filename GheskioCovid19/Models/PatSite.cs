using System;
using System.Collections.Generic;

namespace GheskioCovid19.Models
{
    public partial class PatSite
    {
        public string PatNetId { get; set; }
        public string SiteId { get; set; }
        public DateTime EntryDate { get; set; }
        public int? Nihid { get; set; }
        public byte Preferred { get; set; }
        public string TransSite { get; set; }
        public DateTime? TransDate { get; set; }
        public string TransMed { get; set; }
        public string CreationUser { get; set; }
        public DateTime? CreationDtime { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? UpdateDtime { get; set; }
        public string VoidedUser { get; set; }
        public DateTime? VoidedDtime { get; set; }
        public byte Voided { get; set; }
        public string VoidedReason { get; set; }

        public virtual Patients PatNet { get; set; }
    }
}
