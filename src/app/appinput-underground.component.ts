import { Component, ViewChild, ElementRef , OnInit ,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as jexcel from 'jexcel';
import {SaverdataService} from './saverdata/saverdata.service'

@Component({
  selector: 'appunderground-root',
  templateUrl: './appinput-underground.component.html',
  styleUrls: ['./app.component.scss']
})

export class appunderground implements OnInit, OnDestroy{

  watertable

  constructor(private router: Router,
              private sd: SaverdataService) { }

  @ViewChild("spreadsheet") spreadsheet: ElementRef;
  
  ngOnInit() {
    this.watertable = this.sd.watertable;
  }

  ngOnDestroy(){
    this.sd.watertable = this.watertable;
  }


  ngAfterViewInit() {
    jexcel(this.spreadsheet.nativeElement, {
     data: this.sd.undergroundData2,
      columns: [
        { type: "text", width: "120px" ,title:"地層底面深度\n(m)"},
        { type: "text", width: "120px" ,title:"湿潤単位\n体積重量γt\n(kN/m3)"},
       
      ],
      minDimensions: [2, 20]
    });
  }

  save(): void {
    const data: string = this.sd.save();
    const blob = new window.Blob([data], { type: 'text/plain' });
    FileSaver.saveAs(blob, 'liquef.liq');
  }

  // ファイルを開く
  open(evt) {
    const file = evt.target.files[0];
    evt.target.value = '';
    this.fileToText(file)
      .then(text => {
        this.sd.load(text);
      })
      .catch(err => {
        console.log(err);
      });
      this.router.navigate(['/explain']);
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