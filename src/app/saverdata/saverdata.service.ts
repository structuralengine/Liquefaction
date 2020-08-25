import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaverdataService {

  constructor() { }
  conditionData1  = [[]];
  conditionData2  = [[]];
  undergroundData1 = [[]];
  undergroundData2 = [[]];
  resultData  = [[]];
  watertable;
  selectedIndex = "g4_2";
}
