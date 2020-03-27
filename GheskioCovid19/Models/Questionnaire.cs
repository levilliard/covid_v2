using System;
using System.Collections.Generic;

namespace GheskioCovid19.Models
{
    public partial class Questionnaire
    {
        public byte QuestionId { get; set; }
        public string QuestionDesc { get; set; }
        public byte? Voided { get; set; }
    }
}
