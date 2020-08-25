import { Component, ViewChild,ElementRef } from '@angular/core';
import * as FileSaver from 'file-saver';

import * as jexcel from 'jexcel';

import {SaverdataService} from './saverdata/saverdata.service'

@Component({
    selector: 'app-condition',
    templateUrl: './appinput-condition.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class appinputCondition {

    constructor(private sd: SaverdataService) { }

    save(): void {
      const data: string = "aaa";
  
      const blob = new window.Blob([data], { type: 'text/plain' });
      FileSaver.saveAs(blob, 'liquef.liq');
    }

    @ViewChild("spreadsheet_1") spreadsheet_1: ElementRef;
    @ViewChild("spreadsheet_2") spreadsheet_2: ElementRef;


  ngAfterViewInit() {
    jexcel(this.spreadsheet_1.nativeElement, {
      data: this.sd.condisionData1,
      columns: [
        { type: "text", width: "150px" ,title:"地層底面深度\n(m)"},
        
       
      ],
      minDimensions: [1, 20]
    });

    jexcel(this.spreadsheet_2.nativeElement, {
        data: this.sd.condisionData2,
        columns: [
          { type: "text", width: "150px" ,title:"R"},
          { type: "text", width: "150px" ,title:"N"}
         
        ],
        minDimensions: [2, 20]
      });
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