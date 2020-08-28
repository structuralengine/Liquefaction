import { Component, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as jexcel from 'jexcel';
import {SaverdataService} from './saverdata/saverdata.service'


@Component({
    selector: 'app-condition',
    templateUrl: './appinput-condition.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class appinputCondition {

    water_table

    constructor(private router: Router,
                private sd: SaverdataService) { }

    @ViewChild("spreadsheet_1") spreadsheet_1: ElementRef;
    @ViewChild("spreadsheet_2") spreadsheet_2: ElementRef;


  ngAfterViewInit() {
    jexcel(this.spreadsheet_1.nativeElement, {
      data: this.sd.conditionData1,
      columns: [
        { type: "text", width: "190px" ,title:"液状化を検討する深度\n(m)"},
        
       
      ],
      minDimensions: [1, 20]
    });

    jexcel(this.spreadsheet_2.nativeElement, {
        data: this.sd.conditionData2,
        columns: [
          { type: "text", width: "150px" ,title:"繰返し応力振幅比\nR"},
          { type: "text", width: "150px" ,title:"繰返し載荷回数\nN"}
         
        ],
        minDimensions: [2, 20]
      });
    }
  
  }