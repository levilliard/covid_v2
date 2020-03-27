using System;
using System.Collections.Generic;

namespace GheskioCovid19.Models
{
    public partial class SigneSymptomesRef
    {
        public byte SigneId { get; set; }
        public string Symptome { get; set; }
        public byte? Voided { get; set; }
    }
}
