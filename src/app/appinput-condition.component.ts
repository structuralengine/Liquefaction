import { Component, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';


@Component({
    selector: 'app-condition',
    templateUrl: './appinput-condition.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class appinputCondition {
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