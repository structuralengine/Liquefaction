import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaverdataService {

  conditionData1  = [[]];
  conditionData2  = [[]];
  undergroundData1 = [[]];
  undergroundData2 = [[]];
  resultData  = [[]];
  watertable;
  selectedIndex = "g4_2";

  constructor() { }

  public save(): string {
    const result = {
      conditionData1: this.conditionData1,
      conditionData2: this.conditionData2,
      undergroundData1: this.undergroundData1,
      undergroundData2: this.undergroundData2,
      watertable: this.watertable,
      selectedIndex: this.selectedIndex
    }
    return JSON.stringify(result);
  }

  public load(text: string): void {
    const data = JSON.parse(text);
    if('conditionData1' in data){
      this.conditionData1 = data.conditionData1;
    }
    if('conditionData2' in data){
      this.conditionData2 = data.conditionData2;
    }
    if('undergroundData1' in data){
      this.undergroundData1 = data.undergroundData1;
    }
    if('undergroundData2' in data){
      this.undergroundData2 = data.undergroundData2;
    }
    if('watertable' in data){
      this.watertable = data.watertable;
    }
    if('selectedIndex' in data){
      this.selectedIndex = data.selectedIndex;
    }
  }

}
