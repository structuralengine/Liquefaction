import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jexcel from 'jexcel';
import {SaverdataService} from './saverdata/saverdata.service';

@Component({
  selector: 'appresult-root',
  templateUrl: './appresult.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppResultComponent implements OnInit {

  @ViewChild("spreadsheet") spreadsheet: ElementRef;

  constructor(private http: HttpClient,
    private sd: SaverdataService) { }


  ngOnInit() {  

    const body ={
      "g": [-3.80E-04,-1.46E-03,-3.07E-03,-5.00E-03,-6.93E-03],
      "soil":[
        {
          "sv": 76.3,
          "svd": 45.4,
          "Z": 4.35,
          "RN": [[25,0.70],[32,0.55],[40,0.48],[48,0.44],[55,0.41],[63,0.39],[71,0.37],[78,0.36],[86,0.34],[99,0.32]]
        }
      ]
    };
    
    this.http.post<any>('https://asia-northeast1-the-structural-engine.cloudfunctions.net/Liquefaction',
      body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
      
}

  ngAfterViewInit() {
    jexcel(this.spreadsheet.nativeElement, {
      data: this.sd.resultData,
      columns: [
        { type: "text", width: "150px" ,title:"液状化を検\n討する深度\n(m)"},
        { type: "text", width: "150px" ,title:"全上載圧σv\n(kN/m2)"},
        { type: "text", width: "150px" ,title:"有効上載圧σv'\n(kN/m2)"},
        { type: "text", width: "150px" ,title:"液状化強度比\n R"},
        { type: "text", width: "150px" ,title:"せん断応力比'\n L"},
        { type: "text", width: "150px" ,title:"液状化抵抗率\n FL"},
        { type: "text", width: "150px" ,title:"判定"},
      
      ],
      minDimensions: [7, 20]
    });
  }



}