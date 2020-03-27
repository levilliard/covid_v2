import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatStepper } from '@angular/material';
import { GenericProvider } from 'src/app/providers/generic';
import { SigneSymptomes, EnteteVisite } from 'src/app/models/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-covid-view',
  templateUrl: './covid-view.component.html',
  styleUrls: ['./covid-view.component.css'],
  providers: [GenericProvider]
})
export class CovidViewComponent implements OnInit {

  public selected: FormControl = new FormControl(0);
  displayedColumns: string[] = ['NIHID', 'SITE', 'PATIENT', 'DATE_VISITE', 'DATE_RETOUR', 'INIT_AGENT', 'ACTIONS'];
  public SSYMPTOMES_DATA: Array<SigneSymptomes> = []
  dataSource = new MatTableDataSource<SigneSymptomes>(this.SSYMPTOMES_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private gProvider: GenericProvider) {

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.refresh();
  }

  public toPrint() {

  }

  public toDelete() {

  }

  public refresh() {
    this.gProvider.getArrayOfObject('/signesymptomes/index').subscribe(data => {
      this.SSYMPTOMES_DATA = <Array<SigneSymptomes>>data;
      console.log('data: ', this.SSYMPTOMES_DATA);
      this.dataSource = new MatTableDataSource<SigneSymptomes>(this.SSYMPTOMES_DATA);
    }, error => {
      console.log('Error: ', error);
    })
  }

  public toUpdate(obj: Object) {
    const dialogRef = this.dialog.open(DialogEdit, {
      width: '1250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-crud',
  styleUrls: ['./covid-view.component.css'],
  templateUrl: 'dialog-crud.html',
  providers: [DatePipe, ]
})
export class DialogEdit {
  firstFormGroup: FormGroup;
  _firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  selected = 'Aucun';
  position = 0;

  ssymptomes: SigneSymptomes;
  constructor(private datePipe:DatePipe, private _formBuilder: FormBuilder, private gProvider: GenericProvider,
    public dialogRef: MatDialogRef<DialogEdit>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.ssymptomes = new SigneSymptomes();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(val: string) {
    if (val.includes('domicile')) {
      this.position = 1;
    } else if (val.includes('CSDT')) {
      this.position = 2;
    } else if(val.includes('MSPP')){
      this.position = 3;
    }else{
      this.selected = 'Aucun';
      this.position = 0;
    }
  }


  findPatient(){
    let data: string = this.data["patNetId"];
    if(data == null || data.length < 2){
      alert("PAT_NET_ID est incorrect ");
    }else{
      this.gProvider.getArrayOfObject("/entetevisite/patnetid?id=" + data).subscribe(res=>{
        
        console.log("res: ", res);

        let _data: EnteteVisite = <EnteteVisite>res[0];
        try{
           _data["doB_DATE"] = _data["doB_DATE"].split("T")[0];
        }catch{
          alert("PAT_NET_ID est incorrect ");
        }

        if(_data != null){
          this.firstFormGroup.patchValue({
            'age': _data['currenT_AGE'],
            'sexe': _data['gendeR_DESC'],
            'tel': _data['celphone'],
            'lastname': _data['lastname'],
            'firstname': _data['firstname'],
            'nihid': _data['paT_NET_ID'],
            'site': _data['sitE_ID'],
            "dateNaiss": _data["doB_DATE"],
          })
        }else{
          alert("PAT_NET_ID est incorrect ");
        }
      }, error=>{
        console.log("error: ", error);

        if(error['status'] != null && error['status'] != 200){
          alert('Woyyyyy ! Nous avons rencontre une erreur ! ');
        }
      })
    }
  }

  public setHintValue() {

  }

  private changeDateToMDY(date: string): string{
    let result = null;
    try{
      let temp = date.replace("T", "-").split("-");
      result = temp[1] + "/" + temp[2] + "/" + temp[0];
    }catch(e){

    }

    return result;
  }

  public save(stepper: MatStepper) {

    //[0]firstFormGroup:
    this.ssymptomes.q1 = parseInt(this._firstFormGroup.value.q1);
    if(this.firstFormGroup.value.q1 === true){
      this.ssymptomes.q1 = 1;
    }else{
      this.ssymptomes.q1 = 0;
    }    
    
    if(this.firstFormGroup.value.q4 === true){
      this.ssymptomes.q4 = 1;
    }else{
      this.ssymptomes.q4 = 0;
    }

    //this.ssymptomes.dateNaiss = this.firstFormGroup.value.dateNaiss;
    this.ssymptomes.symptomePosition = this.firstFormGroup.value['symptomePosition'];
    //this.ssymptomes.age = this.firstFormGroup.value.age;
    //this.ssymptomes.sexe = this.firstFormGroup.value.sexe;
    //this.ssymptomes.tel = this.firstFormGroup.value.tet;

    this.ssymptomes.patNetId = this.firstFormGroup.value['nihid'];
    this.ssymptomes.gheskioIra = this.firstFormGroup.value['gheskioIra'];
    this.ssymptomes.site = this.firstFormGroup.value['site'];
    this.ssymptomes.firstname = this.firstFormGroup.value.firstname;
    this.ssymptomes.lastname = this.firstFormGroup.value.lastname;
    this.ssymptomes.dateRetour = this.datePipe.transform(this.firstFormGroup.value.dateRetour, 'yyyy-MM-dd');


    //[1]_firstFormGroup

    if(this._firstFormGroup.value.signeSymptome1 === true){
      this.ssymptomes.signeSymptome1 = 1;
    }else{
      this.ssymptomes.signeSymptome1 = 0;
    }

    if(this._firstFormGroup.value.signeSymptome2 === true){
      this.ssymptomes.signeSymptome2 = 1;
    }else{
      this.ssymptomes.signeSymptome2 = 0;
    }

    if(this._firstFormGroup.value.signeSymptome3 === true){
      this.ssymptomes.signeSymptome3 = 1;
    }else{
      this.ssymptomes.signeSymptome3 = 0;
    }
    if(this._firstFormGroup.value.signeSymptome4 === true){
      this.ssymptomes.signeSymptome4 = 1;
    }else{
      this.ssymptomes.signeSymptome4 = 0;
    }

    if(this._firstFormGroup.value.signeSymptome5 === true){
      this.ssymptomes.signeSymptome5 = 1;
    }else{
      this.ssymptomes.signeSymptome5 = 0;
    }

    if(this._firstFormGroup.value.signeSymptome6 === true){
      this.ssymptomes.signeSymptome6 = 1;
    }else{
      this.ssymptomes.signeSymptome6 = 0;
    }

    if(this._firstFormGroup.value.signeSymptome7 === true){
      this.ssymptomes.signeSymptome7 = 1;
    }else{
      this.ssymptomes.signeSymptome7 = 0;
    }

    if(this._firstFormGroup.value.signeSymptome8 === true){
      this.ssymptomes.signeSymptome8 = 1;
    }else{
      this.ssymptomes.signeSymptome8 = 0;
    }

    this.ssymptomes.duree1 = parseInt(this._firstFormGroup.value.duree1);
    this.ssymptomes.duree2 = parseInt(this._firstFormGroup.value.duree2);
    this.ssymptomes.duree3 = parseInt(this._firstFormGroup.value.duree3);
    this.ssymptomes.duree4 = parseInt(this._firstFormGroup.value.duree4);
    this.ssymptomes.duree5 = parseInt(this._firstFormGroup.value.duree5);
    this.ssymptomes.duree6 = parseInt(this._firstFormGroup.value.duree6);
    this.ssymptomes.duree7 = parseInt(this._firstFormGroup.value.duree7);
    this.ssymptomes.duree8 = parseInt(this._firstFormGroup.value.duree8);

    this.ssymptomes.initialAgent = this._firstFormGroup.value.initialAgent
    this.ssymptomes.dateQuestionNiveau1 = this.datePipe.transform(this._firstFormGroup.value.dateQuestionNiveau1, 'yyyy-MM-dd');

    this.ssymptomes.autreSymptome = this._firstFormGroup.value.autre;

    
    //[2]secondFormGroup
    if(this.secondFormGroup.value.qgrosTrimestre === true){
      this.ssymptomes.qgrosTrimestre = 1;
    }else{
      this.ssymptomes.qgrosTrimestre = 0;
    }

    if(this.secondFormGroup.value.qmaladieCardHyper === true){
      this.ssymptomes.qmaladieCardHyper = 1;
    }else{
      this.ssymptomes.qmaladieCardHyper = 0;
    }

    if(this.secondFormGroup.value.qdiabete === true){
      this.ssymptomes.qdiabete = 1;
    }else{
      this.ssymptomes.qdiabete = 0;
    }

    if(this.secondFormGroup.value.qcirrhose === true){
      this.ssymptomes.qcirrhose = 1;
    }else{
      this.ssymptomes.qcirrhose = 0;
    }

    if(this.secondFormGroup.value.qmaladieNeroChronique === true){
      this.ssymptomes.qmaladieNeroChronique = 1;
    }else{
      this.ssymptomes.qmaladieNeroChronique = 0;
    }

    if(this.secondFormGroup.value.qautrePreciser === true){
      this.ssymptomes.qautrePreciser = 1;
    }else{
      this.ssymptomes.qautrePreciser = 0;
    }

    if(this.secondFormGroup.value.qpostPartum === true){
      this.ssymptomes.qpostPartum = 1;
    }else{
      this.ssymptomes.qpostPartum = 0;
    }

    if(this.secondFormGroup.value.qimmuHiv === true){
      this.ssymptomes.qimmuHiv = 1;
    }else{
      this.ssymptomes.qimmuHiv = 0;
    }

    if(this.secondFormGroup.value.qmaladiePulChronique === true){
      this.ssymptomes.qmaladiePulChronique = 1;
    }else{
      this.ssymptomes.qmaladiePulChronique = 0;
    }

    if(this.secondFormGroup.value.qcancer === true){
      this.ssymptomes.qcancer = 1;
    }else{
      this.ssymptomes.qcancer = 0;
    }

    this.ssymptomes.dateQuestionNiveau2 = this.datePipe.transform(this.secondFormGroup.value.dateQuestionNiveau2, 'yyyy-MM-dd');

    this.ssymptomes.initialPrestataireNiveau2 = this.secondFormGroup.value['initialPrestataireNiveau2']

    //[3]thirdFormGroup
    this.ssymptomes.screeningDate = this.datePipe.transform(this.thirdFormGroup.value.screeningDate, 'yyyy-MM-dd');
    this.ssymptomes.refMsppDate = this.datePipe.transform(this.thirdFormGroup.value.refMsppDate, 'yyyy-MM-dd');

    if (this.ssymptomes.screeningDate != null && this.ssymptomes.screeningDate.length == 0) {
      this.ssymptomes.screeningDate = null
    }

    if (this.ssymptomes.refMsppDate != null && this.ssymptomes.refMsppDate.length == 0) {
      this.ssymptomes.screeningDate = null
    }
    
    if(this.thirdFormGroup.value.screeningResult === true){
      this.ssymptomes.screeningResult = 1;
    }else{
      this.ssymptomes.screeningResult = 0;
    }

    this.ssymptomes.cardNoMedecin = this.thirdFormGroup.value['cardNoMedecin']

    if(this.thirdFormGroup.value.severeDyspnee === true){
      this.ssymptomes.severeDyspnee = 1;
    }else{
      this.ssymptomes.severeDyspnee = 0;
    }

    if(this.thirdFormGroup.value.severeSao === true){
      this.ssymptomes.severeSao = 1;
    }else{
      this.ssymptomes.severeSao = 0;
    }

    if(this.thirdFormGroup.value.severeKarnofsky === true){
      this.ssymptomes.severeKarnofsky = 1;
    }else{
      this.ssymptomes.severeKarnofsky = 0;
    }

    if(this.thirdFormGroup.value.modereSao === true){
      this.ssymptomes.modereSao = 1;
    }else{
      this.ssymptomes.modereSao = 0;
    }

    if(this.thirdFormGroup.value.modereKarnofsky === true){
      this.ssymptomes.modereKarnofsky = 1;
    }else{
      this.ssymptomes.modereKarnofsky = 0;
    }

    if(this.thirdFormGroup.value.refMspp === true){this.ssymptomes.refMspp = 1;}else{this.ssymptomes.refMspp = 0;}
     
    ///
    if(this.thirdFormGroup.value.legerSao === true){this.ssymptomes.legerSao = 1;}else{this.ssymptomes.legerSao = 0;}
    if(this.thirdFormGroup.value.legerKarnofsky === true){this.ssymptomes.legerKarnofsky = 1;}else{this.ssymptomes.legerKarnofsky = 0;}
    if(this.thirdFormGroup.value.legerFreqRep === true){this.ssymptomes.legerFreqRep = 1;}else{this.ssymptomes.legerFreqRep = 0;}
    if(this.thirdFormGroup.value.legerFreCard === true){this.ssymptomes.legerFreCard = 1;}else{this.ssymptomes.legerFreCard = 0;}
    if(this.thirdFormGroup.value.legerStatMental === true){this.ssymptomes.legerStatMental = 1;}else{this.ssymptomes.legerStatMental = 0;}
    if(this.thirdFormGroup.value.legerCoMorb === true){this.ssymptomes.legerCoMorb = 1;}else{this.ssymptomes.legerCoMorb = 0;}
    if(this.thirdFormGroup.value.severeFreqRep === true){this.ssymptomes.severeFreqRep = 1;}else{this.ssymptomes.severeFreqRep = 0;}
    if(this.thirdFormGroup.value.severeFreCard === true){this.ssymptomes.severeFreCard = 1;}else{this.ssymptomes.severeFreCard = 0;}
    if(this.thirdFormGroup.value.severeStatMental === true){this.ssymptomes.severeStatMental = 1;}else{this.ssymptomes.severeStatMental = 0;}
    if(this.thirdFormGroup.value.severeCoMorb === true){this.ssymptomes.severeCoMorb = 1;}else{this.ssymptomes.severeCoMorb = 0;}
    if(this.thirdFormGroup.value.modereFreqRep === true){this.ssymptomes.modereFreqRep = 1;}else{this.ssymptomes.modereFreqRep = 0;}
    if(this.thirdFormGroup.value.modereFreCard === true){this.ssymptomes.modereFreCard = 1;}else{this.ssymptomes.modereFreCard = 0;}
    if(this.thirdFormGroup.value.modereStatMental === true){this.ssymptomes.modereStatMental = 1;}else{this.ssymptomes.modereStatMental = 0;}
    if(this.thirdFormGroup.value.modereCoMorb === true){this.ssymptomes.modereCoMorb = 1;}else{this.ssymptomes.modereCoMorb = 0;}

    this.ssymptomes.dateVisite = new Date().toISOString().split("T")[0];
    this.ssymptomes.id = this.data["id"];

    console.log('form data: ', this.ssymptomes);

    this.gProvider.updateObject(this.ssymptomes, '/signesymptomes/' + this.ssymptomes.id).subscribe(res => {
      console.log('on add signe symptomes success: ', res);
      //this.resetData(stepper);
      this.onNoClick();
    }, error => {
      console.log('on add signe symptomes error: ', error);
      this.resetData(stepper)
      if (error['status'] != null && error['status'] != 200) {
        alert('Woyyyyy ! Nous avons rencontre une erreur ! ');
      }
      this.onNoClick();
    })
  }
  
  resetData(stepper: MatStepper){
    this.firstFormGroup.reset();
    this._firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
  }

  ngOnInit() {
    this.findPatient();

    this.firstFormGroup = this._formBuilder.group({
      q1: ['',],
      q4: ['',],
      dateNaiss: ['',],
      symptomePosition: ['',],
      age: ['',],
      sexe: ['',],
      tel: ['',],
      nihid: ['', { validators: [Validators.required], updateOn: "blur" }],
      gheskioIra: ['', Validators.required],
      site: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dateRetour: ['', Validators.required],
    });

    this.firstFormGroup.patchValue({
      "q1": this.data["q1"],
      "q4": this.data["q4"],
      "dateNaiss": this.data["dateNaiss"],
      "symptomePosition": this.data["symptomePosition"],
      "age": this.data["age"],
      "sexe": this.data["sexe"],
      "tel": this.data["tel"],
      "nihid": this.data["nihid"],
      "gheskioIra": this.data["gheskioIra"],
      "site": this.data["site"],
      "firstname": this.data["firstname"],
      "lastname": this.data["lastname"],
      "dateRetour": this.changeDateToMDY(this.data["dateRetour"]),
    })

    this._firstFormGroup = this._formBuilder.group({
      // q2: ['', ],
      // q3: ['', ],
      duree1: ['',],
      signeSymptome1: ['',],
      duree2: ['',],
      signeSymptome2: ['',],
      duree3: ['',],
      signeSymptome3: ['',],
      duree4: ['',],
      signeSymptome4: ['',],
      duree5: ['',],
      signeSymptome5: ['',],
      duree6: ['',],
      signeSymptome6: ['',],
      duree7: ['',],
      signeSymptome7: ['',],
      duree8: ['',],
      signeSymptome8: ['',],
      autre: ['',],
      initialAgent: ['', Validators.required],
      dateQuestionNiveau1: ['', Validators.required],
    });

    this._firstFormGroup.patchValue({
      "duree1": this.data["duree1"],
      "signeSymptome1": this.data["signeSymptome1"],
      "duree2": this.data["duree2"],
      "signeSymptome2": this.data["signeSymptome2"],
      "duree3": this.data["duree3"],
      "signeSymptome3": this.data["signeSymptome3"],
      "duree4": this.data["duree4"],
      "signeSymptome4": this.data["signeSymptome4"],
      "duree5": this.data["duree5"],
      "signeSymptome5": this.data["signeSymptome5"],
      "duree6": this.data["duree6"],
      "signeSymptome6": this.data["signeSymptome6"],
      "duree7": this.data["duree7"],
      "signeSymptome7": this.data["signeSymptome7"],
      "duree8": this.data["duree8"],
      "signeSymptome8": this.data["signeSymptome8"],
      "autre": this.data["autreSymptome"],
      "initialAgent": this.data["initialAgent"],
      "dateQuestionNiveau1": this.changeDateToMDY(this.data["dateQuestionNiveau1"]),
    })

    this.secondFormGroup = this._formBuilder.group({
      qgrosTrimestre: ['',],
      qmaladieCardHyper: ['',],
      qdiabete: ['',],
      qcirrhose: ['',],
      qmaladieNeroChronique: ['',],
      qautrePreciser: ['',],
      qpostPartum: ['',],
      qimmuHiv: ['',],
      qmaladieRenale: ['',],
      qmaladiePulChronique: ['',],
      qcancer: ['',],
      dateQuestionNiveau2: ['', Validators.required],
      initialPrestataireNiveau2: ['', Validators.required],
    })

    this.secondFormGroup.patchValue({
      "qgrosTrimestre": this.data["qgrosTrimestre"],
      "qmaladieCardHyper": this.data["qmaladieCardHyper"],
      "qdiabete": this.data["qdiabete"],
      "qcirrhose": this.data["qcirrhose"],
      "qmaladieNeroChronique": this.data["qmaladieNeroChronique"],
      "qautrePreciser": this.data["qautrePreciser"],
      "qpostPartum": this.data["qpostPartum"],
      "qimmuHiv": this.data["qimmuHiv"],
      "qmaladieRenale": this.data["qmaladieRenale"],
      "qmaladiePulChronique": this.data["qmaladiePulChronique"],
      "qcancer": this.data["qcancer"],
      "dateQuestionNiveau2": this.changeDateToMDY(this.data["dateQuestionNiveau2"]),
      "initialPrestataireNiveau2": this.data["initialPrestataireNiveau2"],
    })

    this.thirdFormGroup = this._formBuilder.group({
      severeDyspnee: ['',],
      severeSao: ['',],
      severeKarnofsky: ['',],
      modereSao: ['',],
      modereKarnofsky: ['',],
      screeningDate: ['', Validators.required],
      screeningResult: ['', Validators.required],
      cardNoMedecin: ['', Validators.required],
      refMspp: ['', ],
      refMsppDate: ['', ],
      
      legerSao: ['',],
      legerKarnofsky: ['',],
      legerFreqRep: ['',],
      legerFreCard: ['',],
      legerStatMental: ['',],
      legerCoMorb: ['',],      
      severeFreqRep: ['',],
      severeFreCard: ['',],
      severeStatMental: ['',],
      severeCoMorb: ['',],
      modereFreqRep: ['',],
      modereFreCard: ['',],
      modereStatMental: ['',],
      modereCoMorb: ['',],

    });

    this.thirdFormGroup.patchValue({
      "severeDyspnee": this.data["severeDyspnee"],
      "severeSao": this.data["severeSao"],
      "severeKarnofsky": this.data["severeKarnofsky"],
      "modereSao": this.data["modereSao"],
      "modereKarnofsky": this.data["modereKarnofsky"],
      "screeningDate": this.changeDateToMDY(this.data["screeningDate"]),
      "screeningResult": this.data["screeningResult"],
      "cardNoMedecin": this.data["cardNoMedecin"],
      "refMspp": this.data["refMspp"],
      "refMsppDate": this.changeDateToMDY(this.data["refMsppDate"]),
      "legerSao": this.data["legerSao"],
      "legerKarnofsky": this.data["legerKarnofsky"],
      "legerFreqRep": this.data["legerFreqRep"],
      "legerFreCard": this.data["legerFreCard"],
      "legerStatMental": this.data["legerStatMental"],
      "legerCoMorb": this.data["legerCoMorb"],
      "severeFreqRep": this.data["severeFreqRep"],
      "severeFreCard": this.data["severeFreCard"],
      "severeStatMental": this.data["severeStatMental"],
      "severeCoMorb": this.data["severeCoMorb"],
      "modereFreqRep": this.data["modereFreqRep"],
      "modereFreCard": this.data["modereFreCard"],
      "modereStatMental": this.data["modereStatMental"],
      "modereCoMorb": this.data["modereCoMorb"],
    })
  }
}

