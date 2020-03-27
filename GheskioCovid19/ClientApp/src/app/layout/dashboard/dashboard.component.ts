import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Chart } from 'chart.js';
import { GenericProvider } from '../../../app/providers/generic';
import { Resultat } from 'src/app/models/models';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [GenericProvider]
})
export class DashboardComponent implements OnInit {
    places: Array<any> = [];
    @ViewChild('lineCanvas', {static: true}) lineCanvas: ElementRef;
    private lineChart: Chart;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    }

    constructor(private gProvider: GenericProvider){
      // this.gProvider.getArrayOfObject("/patients").subscribe(data=>{
      //   console.log("Patients: ", data[0]);
      // }, error=>{
      //   console.log("Error: ", error);
      // })
      // let obj: Resultat = new Resultat();
      // obj.DateResult = "2020-01-04";
      // obj.DateVisite = "2020-01-04";
      // obj.Nihid = "1-110";
      // obj.ReferenceMspp = true;
      // obj.Voided = null;
      // this.gProvider.addObject(obj, "/resultats").subscribe(res=>{
      //   console.log("add data success: ", res);
      // }, error=>{
      //   console.log("add data error: ", error);
      // })
    }

    ngOnInit() {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
              {
                label: 'My Covid19 dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40],
                spanGaps: false
              }
            ]
          }
        });
      }
}
