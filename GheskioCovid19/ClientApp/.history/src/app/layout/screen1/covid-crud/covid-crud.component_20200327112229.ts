import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericProvider } from 'src/app/providers/generic';
import { SigneSymptomes, EnteteVisite } from 'src/app/models/models';
import { Observable } from 'rxjs';
import { error } from 'protractor';
import { MatStepper } from '@angular/material/stepper';
import { } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DialogEdit } from '../covid-view/covid-view.component';

// import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
// import {
//   MAT_MOMENT_DATE_FORMATS,
//   MomentDateAdapter,
//   MAT_MOMENT_DATE_ADAPTER_OPTIONS,
// } from '@angular/material-moment-adapter';

var ADD_PATIENT = false;
var UPDATE_PATIENT = false;

@Component({
  selector: 'app-covid-crud',
  templateUrl: './covid-crud.component.html',
  styleUrls: ['./covid-crud.component.css'],
  providers: [
    GenericProvider, DatePipe

      // {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},

      // {
      //   provide: DateAdapter,
      //   useClass: MomentDateAdapter,
      //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      // },
      // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ],
})
export class CovidCrudComponent implements OnInit {
  firstFormGroup: FormGroup;
  _firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  selected = 'Aucun';
  position = 0;
  ssymptomes: SigneSymptomes;
  patient = ""


  constructor(private datePipe : DatePipe, private dialog: MatDialog, private _formBuilder: FormBuilder, private gProvider: GenericProvider) {
    this.ssymptomes = new SigneSymptomes();
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

  public findPat(){
    console.log(this.patient);

    if(this.patient != null && this.patient.length > 2){
      
      this.gProvider.getArrayOfObject("/signesymptomes/patnetid?id=" + this.patient).subscribe(res=>{
        this.openDialog(this.patient, true);
        this.ssymptomes = <SigneSymptomes>res[0];
      }, error=>{
        if (error['status'] != null && error['status'] != 200) {
          this.openDialog(this.patient, false);
        }
      })
    }
  }

  openDialog(patient: string, found: boolean): void {
    const dialogRef = this.dialog.open(DialogAdd, {
      width: '350px',
      data: {found: found, patient: patient}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(UPDATE_PATIENT){
        //open dialog
        const dialogRef = this.dialog.open(DialogEdit, {
          width: '1250px',
          data: this.ssymptomes
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
    });
  }

  findPatient(){
    const data: string = this.firstFormGroup.value["nihid"];
    if(data == null || data.length < 2){
      alert("PAT_NET_ID est incorrect ");
    }else{
      this.gProvider.getArrayOfObject("/signesymptomes/patnetid?id=" + data).subscribe(res=>{
        
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
        }
      }, error=>{

      })
    }
  }

  
  findPatient2(){
    const data = this.patient;
    if(data == null || data.length < 2){
      alert("PAT_NET_ID est incorrect ");
    }else{
      this.gProvider.getArrayOfObject("/signesymptomes/patnetid?id=" + data).subscribe(res=>{
        
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
        }
      }, error=>{

      })
    }
  }

  public setHintValue() {

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
    this.ssymptomes.dateQuestionNiveau1 = this._firstFormGroup.value.dateQuestionNiveau1
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

    if(this.secondFormGroup.value.QmaladieRenale === true){
      this.ssymptomes.qmaladieRenale = 1;
    }else{
      this.ssymptomes.qmaladieRenale = 0;
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
      this.ssymptomes.refMsppDate = null
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

    if(this.thirdFormGroup.value.refMspp === true){
      this.ssymptomes.refMspp = 1;
    }else{
      this.ssymptomes.refMspp = 0;
    }
     
    this.ssymptomes.dateVisite = new Date().toISOString().split("T")[0];
     
    console.log("Form 1, 2:", this.firstFormGroup, this._firstFormGroup.value)

    this.gProvider.addObject(this.ssymptomes, '/signesymptomes').subscribe(res => {
      console.log('on add signe symptomes success: ', res);
      this.resetData(stepper);
    }, error => {
      console.log('on add signe symptomes error: ', error);
      this.resetData(stepper)
      if (error['status'] != null && error['status'] != 200) {
        alert('Woyyyyy ! Nous avons rencontre une erreur ! ');
      }
    })
  }
  
  resetData(stepper: MatStepper){
    this.firstFormGroup.reset();
    this._firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    stepper.previous();
  }

  ngOnInit() {

    //this.gProvider

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
  }
}


@Component({
  selector: 'dialog-add',
  templateUrl: 'dialog-add.html',
})
export class DialogAdd {

  
  constructor(
    public dialogRef: MatDialogRef<DialogAdd>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
    ADD_PATIENT = true;
  }

  public onUpdate(){
    UPDATE_PATIENT = true;
    this.dialogRef.close();
  }

}


