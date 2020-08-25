import { Component, ViewChild, ElementRef  } from '@angular/core';
import * as FileSaver from 'file-saver';

import * as jexcel from 'jexcel';

@Component({
  selector: 'appresult-root',
  templateUrl: './appresult.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppResultComponent {

  constructor() {

  }

  @ViewChild("spreadsheet") spreadsheet: ElementRef;

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