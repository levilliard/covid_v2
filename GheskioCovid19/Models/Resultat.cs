using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GheskioCovid19.Models
{
    public partial class Resultat
    {
        public Resultat()
        {

        }

        [Key]
        public int Id { get; set; }
        public int SigneSymptomesId { get; set; }
        public string Nihid { get; set; }
        public DateTime DateVisite { get; set; }
        public string Result { get; set; }
        public DateTime DateResult { get; set; }
        public bool? ReferenceMspp { get; set; }
        public byte? Voided { get; set; }

        public virtual SigneSymptomes SigneSymptomes { get; set; }
    }
}
