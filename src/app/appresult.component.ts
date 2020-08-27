import { Component, ViewChild, ElementRef } from '@angular/core';
import { SaverdataService } from './saverdata/saverdata.service';

@Component({
  selector: 'appresult-root',
  templateUrl: './appresult.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppResultComponent  {
  public Data: any
  constructor(private sd: SaverdataService) { 
  this.Data = this.getData();
}
  getData(){
      return this.sd.resultData; 
    }
}