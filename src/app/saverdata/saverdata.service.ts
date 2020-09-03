import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaverdataService {

  public conditionData1  = [
    [
        "3.00"
    ],
    [
        "4.00"
    ],
    [
        "4.70"
    ]
];  // 液状化を検討する深度
  public conditionData2  = [
    [
      "0.70",
      "24.6"
  ],
  [
      "0.55",
      "32.3"
  ],
  [
      "0.48",
      "40.0"
  ],
  [
      "0.44",
      "47.7"
  ],
  [
      "0.41",
      "55.4"
  ],
  [
      "0.39",
      "63.1"
  ],
  [
      "0.37",
      "70.8"
  ],
  [
      "0.36",
      "78.5"
  ],
  [
      "0.34",
      "86.2"
  ],
  [
      "0.32",
      "99.4"
  ],
  [
      "0.30",
      "112.6"
  ],
  [
      "0.29",
      "125.8"
  ],
  [
      "0.28",
      "139"
  ],
  [
      "0.27",
      "152.2"
  ],
  [
      "0.26",
      "165.4"
  ],
  [
      "0.25",
      "178.6"
  ],
  [
      "0.24",
      "191.8"
  ],
  [
      "0.23",
      "205.0"
  ]
  ];  // 室内試験結果 R, N
  public undergroundData2 = [
    [
      "2.0",
      "17"
  ],
  [
      "11.6",
      "18"
  ]
  ]; // 地層厚と単位体積従量
  public resultData  = [  ];      // 解析結果
  public watertable: number = 1.26; // 地下水位
  public selectedIndex = "g5_2";    // スペクトルの種類

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

  constructor() {
   }

  public save(): string {
    const result = {
      conditionData1: this.conditionData1,
      conditionData2: this.conditionData2,
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
