using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GheskioCovid19.Models
{
    public partial class SigneSymptomes
    {
        public SigneSymptomes()
        {
            Resultat = new HashSet<Resultat>();
        }

        [Key]
        public int Id { get; set; }

        public byte? Site { get; set; }
        public string GheskioIra { get; set; }
        public DateTime DateVisite { get; set; }
        public byte? Q1 { get; set; }
        public byte? Q2 { get; set; }
        public byte? Q4 { get; set; }
        public DateTime? DateRetour { get; set; }
        public byte? Q3 { get; set; }
        public string InitialAgent { get; set; }
        public DateTime? DateQuestionNiveau1 { get; set; }
        public bool? SigneSymptome1 { get; set; }
        public byte? Duree1 { get; set; }
        public bool? SigneSymptome2 { get; set; }
        public byte? Duree2 { get; set; }
        public bool? SigneSymptome3 { get; set; }
        public byte? Duree3 { get; set; }
        public bool? SigneSymptome4 { get; set; }
        public byte? Duree4 { get; set; }
        public bool? SigneSymptome5 { get; set; }
        public byte? Duree5 { get; set; }
        public bool? SigneSymptome6 { get; set; }
        public byte? Duree6 { get; set; }
        public bool? SigneSymptome7 { get; set; }
        public byte? Duree7 { get; set; }
        public string SigneSymptome8 { get; set; }
        public byte? Duree8 { get; set; }
        public string InitialPrestataireNiveau2 { get; set; }
        public DateTime? DateQuestionNiveau2 { get; set; }
        public DateTime? ScreeningDate { get; set; }
        public bool? ScreeningResult { get; set; }
        public string CardNoMedecin { get; set; }
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public byte? Voided { get; set; }
        
        public string SymptomePosition { get; set; }
        public string AutreSymptome { get; set; }

        public string PatNetId { get; set; }

        public bool SevereDyspnee { get; set; }
        public bool SevereSao { get; set; }
        public bool SevereKarnofsky { get; set; }
        public bool ModereSao { get; set; }
        public bool ModereKarnofsky { get; set; }
        public DateTime? RefMsppDate { get; set; }
        public bool RefMspp { get; set; }

        public bool QgrosTrimestre { get; set; }
        public bool QmaladieCardHyper { get; set; }
        public bool Qdiabete { get; set; }
        public bool Qcirrhose { get; set; }
        public bool QmaladieNeroChronique { get; set; }
        public bool QautrePreciser { get; set; }
        public bool QpostPartum { get; set; }
        public bool QimmuHiv { get; set; }
        public bool QmaladieRenale { get; set; }
        public bool QmaladiePulChronique { get; set; }
        public bool Qcancer { get; set; }

        public bool LegerSao { get; set; }
        public bool LegerKarnofsky { get; set; }
        public bool LegerFreqRep { get; set; }
        public bool LegerFreCard { get; set; }
        public bool LegerStatMental { get; set; }
        public bool LegerCoMorb { get; set; }
        public bool SevereFreqRep { get; set; }
        public bool SevereFreCard { get; set; }
        public bool SevereStatMental { get; set; }
        public bool SevereCoMorb { get; set; }
        public bool ModereFreqRep { get; set; }
        public bool ModereFreCard { get; set; }
        public bool ModereStatMental { get; set; }
        public bool ModereCoMorb { get; set; }

        public virtual Patients PatNet { get; set; }
        public virtual ICollection<Resultat> Resultat { get; set; }


    }
}
