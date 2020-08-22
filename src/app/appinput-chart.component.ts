import { Component, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js'; // データ型をimport
import { Color, Label, BaseChartDirective } from 'ng2-charts'; // ng2-chartsのプロパティのデータ型をimport
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-chart',
    templateUrl: './appinput-chart.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class appChart {
  
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  
    // data
    lineChartLabels: Label[] = [];
    lineChartData: ChartDataSets[] = [
      {
        data: [],
        label: '加速度'
      },
    ];
    lineChartColors: Color[] = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,255,0.28)',
      },
    ];
    lineChartType = 'line'; // グラフの種類
  
    lineChartOptions = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              min: -1200,
              max: 1200,
            }
          }
        ]
      }
    };
  
  
    constructor(private http: HttpClient) {
  
      this.get("L2スペクトルⅡ(G5地盤).SPR");
  
    }
  
    onSelectChange(value) {
      switch (value) {
        case "g0_1":
          this.get("L2スペクトルⅠ(G0地盤).SPR")
          break;
        case "g1_1":
          this.get("L2スペクトルⅠ(G1地盤).SPR")
          break;
        case "g2_1":
          this.get("L2スペクトルⅠ(G2地盤).SPR")
          break;
        case "g3_1":
          this.get("L2スペクトルⅠ(G3地盤).SPR")
          break;
        case "g4_1":
          this.get("L2スペクトルⅠ(G4地盤).SPR")
          break
        case "g5_1":
          this.get("L2スペクトルⅠ(G5地盤).SPR")
          break;
        case "g0_2":
          this.get("L2スペクトルⅡ(G0地盤).SPR")
          break;
        case "g1_2":
          this.get("L2スペクトルⅡ(G1地盤).SPR")
          break;
        case "g2_2":
          this.get("L2スペクトルⅡ(G2地盤).SPR")
          break;
        case "g3_2":
          this.get("L2スペクトルⅡ(G3地盤).SPR")
          break;
        case "g4_2":
          this.get("L2スペクトルⅡ(G4地盤).SPR")
          break;
        case "g5_2":
          this.get("L2スペクトルⅡ(G5地盤).SPR")
          break;
      }
    }
  
    private get(filename: string): void {
      const url = 'assets/spec/' + filename;
      this.http.get(url, { responseType: 'text' }).subscribe(
  
        data => {
          const yy: number[] = new Array();
          const xx: string[] = new Array();
  
          const lines = data.split('\n');
          for (let i = 2; i < lines.length; i++) {
            const line: string = lines[i];
            const xy: string[] = line.trim().split(' ')
            const x: string = xy[0];
            const y: number = Number(xy[xy.length - 1]);
            xx.push(x);
            yy.push(y);
          }
  
          setTimeout(() => {
            this.chart.chart.data.datasets[0].data = yy;
            this.chart.chart.data.labels = xx;
            this.chart.chart.update()
          }, 2000);
  
        },
        error => {
          console.log(error);
        }
      );
    }

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
  