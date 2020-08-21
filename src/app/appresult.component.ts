import { Component, ViewChild, ElementRef  } from '@angular/core';
import { AppComponent } from './app.component';

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
        { type: "dropdown", width: "100px", source: ["Y", "N"] },
        { type: "color", width: "100px", render: "square" }
      ],
      minDimensions: [10, 10]
    });
  }

}