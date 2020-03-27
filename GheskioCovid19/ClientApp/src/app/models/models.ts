export class Patients {
    PatNetId: string;
    Enrolstring: string;
    SiteId: string;
    ClinicId: string;
    Nihid: number;
    TypeNumber: number;
    Number: string;
    Dobstring: string;
    Age: number;
    MoisEntry: number;
    MothersName: string;
    MothersLastname: string;
    Bloodtrans: number;
    Totalchildren: number;
    LiveWithpartner: number;
    GenderId: string;
    ReferenceId: string;
    Birthplace: string;
    Remarks: string;
    Sqltodbf: number;
    Sqltodbfstring: string;
    Status: string;
    Statusstring: string;
    Ponumberage1: string;
    Ponumberage2: string;
    Ponumberage3: string;
    CreationUser: string;
    CreationD: string;
    UpstringUser: string;
    UpstringD: string;
    VoidedUser: string;
    VoidedD: string;
    Voided: number;
    VoidedReason: string;
    GenderChoisi: string;
    OtherSiteId: string;
}

export class SigneSymptomes {
    id: number; 
    site: number; 
    gheskioIra: string;
    dateVisite: string;
    q1: number; 
    q2: number;
    dateRetour: string;
    q3: number; 
    q4: number; 
    initialAgent: string;
    dateQuestionNiveau1: string;
    signeSymptome1: number; 
    duree1: number; 
    signeSymptome2: number; 
    duree2: number; 
    signeSymptome3: number; 
    duree3: number;
    signeSymptome4: number;
    duree4: number;
    signeSymptome5: number; 
    duree5: number;
    signeSymptome6: number;
    duree6: number;
    signeSymptome7: number;
    duree7: number;
    signeSymptome8: number; 
    duree8: number;
    initialPrestataireNiveau2: string; 
    dateQuestionNiveau2: string;
    screeningDate: string;
    screeningResult: number; 
    cardNoMedecin: string;
    voided: number;
    patNetId: string; 

    symptomePosition: string;
    refMspp: number;
    refMsppDate: string;
    autreSymptome: string;
    firstname: string;
    lastname: string;
    qgrosTrimestre: number;
    qmaladieCardHyper: number;
    qdiabete: number;
    qcirrhose: number;
    qmaladieNeroChronique: number;
    qautrePreciser: number;
    qpostPartum: number;
    qimmuHiv: number;
    qmaladieRenale: number;
    qmaladiePulChronique: number;
    qcancer: number;

    legerSao: number;
    legerKarnofsky: number;
    legerFreqRep: number;
    legerFreCard: number;
    legerStatMental: number;
    legerCoMorb: number;

    severeFreqRep: number;
    severeFreCard: number;
    severeStatMental: number;
    severeCoMorb: number;
    severeDyspnee: number;
    severeSao: number;
    severeKarnofsky: number;

    modereFreqRep: number;
    modereFreCard: number;
    modereStatMental: number;
    modereCoMorb: number;
    modereSao: number;
    modereKarnofsky: number;

    patients: []; 
    resultat: Array<Resultat>;
}

export class Resultat{
     id: number;
     signeSymptomesId: number;
     nihid: string; 
     dateVisite: string; 
     result: string; 
     dateResult: string; 
     referenceMspp: boolean; 
     voided: number; 
}

export class PatSite{
     PatNetId: string; 
     SiteId: string; 
     EntryDate: string; 
     Nihid: number; 
     Preferred: number; 
     TransSite: string; 
     TransDate: string; 
     TransMed: string; 
     CreationUser: string; 
     CreationDtime: string; 
     UpdateUser: string; 
     UpdateDtime: string; 
     VoidedUser: string; 
     VoidedDtime: string; 
     Voided: number; 
     VoidedReason: string; 
}


export class EnteteVisite{
    sitE_ID: string;
    siglE_SITE: string;
    sitE_DESC: string;
    paT_NET_ID: string;
    lastname: string;
    firstname: string;
    age: number;
    moiS_ENTRY: number;
    doB_DATE: string;
    gheskiO_ID: string;
    counter: number;
    adress: string;
    celphone: string;
    celphonE2: string;
    housetel: string;
    houseteL2: string;
    enroL_DATE: string;
    gendeR_DESC: string;
    currenT_AGE: number;
}