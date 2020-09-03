import { Component, ViewChild, ElementRef , OnInit ,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as jexcel from 'jexcel';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {SaverdataService} from './saverdata/saverdata.service'
import { NgbdModalBasicComponent } from './ngbd-modal-basic/ngbd-modal-basic.component'

@Component({
  selector: 'appunderground-root',
  templateUrl: './appinput-underground.component.html',
  styleUrls: ['./app.component.scss']
})

export class appunderground implements OnInit, OnDestroy{

  watertable

  constructor(private router: Router,
              private sd: SaverdataService,
              private modalService: NgbModal) { }

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
      columns:[
        { type: 'numeric', title:'地層厚\n(m)', width:120, mask:"#,##.#", decimal:'.' },
        { type: 'numeric', title:'湿潤単位\n体積重量γt\n(kN/m3)', width:120, mask:"#,##.#", decimal:'.'  },
      ],
      minDimensions: [2, 20]
    });
  }

  view(){
    this.modalService.open(NgbdModalBasicComponent);
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
      this.router.navigate(['/condition']);
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