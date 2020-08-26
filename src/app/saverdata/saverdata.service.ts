import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaverdataService {

  public conditionData1  = [[]];
  public conditionData2  = [[]];
  public undergroundData1 = [[]];
  public undergroundData2 = [[]];
  public resultData  = [[]];
  public watertable: number = null;
  public selectedIndex = "g4_2";

  public spectrumlist: any[] = [
    { id: 'g0_1', name: 'L2スペクトルⅠ(G0地盤)', file: 'assets/spec/L2スペクトルⅠ(G0地盤).SPR' },
    { id: 'g1_1', name: 'L2スペクトルⅠ(G1地盤)', file: 'assets/spec/L2スペクトルⅠ(G1地盤).SPR' },
    { id: 'g2_1', name: 'L2スペクトルⅠ(G2地盤)', file: 'assets/spec/L2スペクトルⅠ(G2地盤).SPR' },
    { id: 'g3_1', name: 'L2スペクトルⅠ(G3地盤)', file: 'assets/spec/L2スペクトルⅠ(G3地盤).SPR' },
    { id: 'g4_1', name: 'L2スペクトルⅠ(G4地盤)', file: 'assets/spec/L2スペクトルⅠ(G4地盤).SPR' },
    { id: 'g5_1', name: 'L2スペクトルⅠ(G5地盤)', file: 'assets/spec/L2スペクトルⅠ(G5地盤).SPR' },
    { id: 'g0_2', name: 'L2スペクトルⅡ(G0地盤)', file: 'assets/spec/L2スペクトルⅡ(G0地盤).SPR' },
    { id: 'g1_2', name: 'L2スペクトルⅡ(G1地盤)', file: 'assets/spec/L2スペクトルⅡ(G1地盤).SPR' },
    { id: 'g2_2', name: 'L2スペクトルⅡ(G2地盤)', file: 'assets/spec/L2スペクトルⅡ(G2地盤).SPR' },
    { id: 'g3_2', name: 'L2スペクトルⅡ(G3地盤)', file: 'assets/spec/L2スペクトルⅡ(G3地盤).SPR' },
    { id: 'g4_2', name: 'L2スペクトルⅡ(G4地盤)', file: 'assets/spec/L2スペクトルⅡ(G4地盤).SPR' },
    { id: 'g5_2', name: 'L2スペクトルⅡ(G5地盤)', file: 'assets/spec/L2スペクトルⅡ(G5地盤).SPR' }
  ];

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
