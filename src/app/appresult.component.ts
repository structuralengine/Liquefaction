import { Component, ViewChild, ElementRef } from '@angular/core';
import * as jexcel from 'jexcel';
import { SaverdataService } from './saverdata/saverdata.service';

@Component({
  selector: 'appresult-root',
  templateUrl: './appresult.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppResultComponent  {

  constructor(private sd: SaverdataService) { }

  ngAfterViewInit() {
    // jexcel(this.spreadsheet.nativeElement, {
    //   data: this.sd.resultData,
    //   columns: [
    //     { type: "text", width: "100px", title: "液状化を検\n討する深度\n(m)" },
    //     { type: "text", width: "100px", title: "全上載圧\nσv\n(kN/m2)" },
    //     { type: "text", width: "100px", title: "有効上載圧\nσv'\n(kN/m2)" },
    //     { type: "text", width: "100px", title: "液状化強度比\n R" },
    //     { type: "text", width: "100px", title: "せん断応力比'\n L" },
    //     { type: "text", width: "100px", title: "液状化抵抗率\n FL" },
    //     { type: "text", width: "100px", title: "判定" },

    //   ],
    //   minDimensions: [7, 20]
    // });
  }


}