import { Component, ViewChild, ElementRef  } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as jexcel from 'jexcel';

@Component({
  selector: 'appunderground-root',
  templateUrl: './appinput-underground.component.html',
  styleUrls: ['./app.component.scss']
})

export class appunderground {

  constructor() {

  }

  @ViewChild("spreadsheet") spreadsheet: ElementRef;

  ngAfterViewInit() {
    jexcel(this.spreadsheet.nativeElement, {
      data: [[]],
      columns: [
        { type: "text", width: "150px" ,title:"地層底面深度\n(m)"},
        { type: "text", width: "150px" ,title:"湿潤単位\n体積重量γt\n(kN/m3)"},
       
      ],
      minDimensions: [2, 20]
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