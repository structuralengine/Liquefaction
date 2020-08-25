import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as FileSaver from 'file-saver';
import * as jexcel from 'jexcel';

@Component({
  selector: 'appresult-root',
  templateUrl: './appresult.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppResultComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  @ViewChild("spreadsheet") spreadsheet: ElementRef;

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
      data: [[]],
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


  save(): void {
    const data: string = "aaa";

    const blob = new window.Blob([data], { type: 'text/plain' });
    FileSaver.saveAs(blob, 'liquef.liq');
  }

  // ファイルを開く
  open(evt) {
    const file = evt.target.files[0];
    const fileName = file.name;
    evt.target.value = '';
    let data: any
    this.fileToText(file)
      .then(text => {
        data = false;
      })
      .catch(err => {
        console.log(err);
      });
  }

  private fileToText(file): any {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });
  }

}