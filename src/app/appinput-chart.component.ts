import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js'; // データ型をimport
import { Color, Label, BaseChartDirective } from 'ng2-charts'; // ng2-chartsのプロパティのデータ型をimport
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { SaverdataService } from './saverdata/saverdata.service'
import { NONE_TYPE } from '@angular/compiler';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-chart',
  templateUrl: './appinput-chart.component.html',
  styleUrls: ['./app.component.scss']
})
export class appChart implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

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

  constructor(private router: Router,
              private http: HttpClient,
              public sd: SaverdataService) {
  }

  ngOnInit() {
    this.onSelectChange(this.sd.selectedIndex);
  }

  ngOnDestroy() {
  }

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
      borderWidth: 1,
      backgroundColor: 'rgba(255,255,255,255)',
    },
  ];
  lineChartType = 'line'; // グラフの種類
  pointStyle = 'line';
  lineChartOptions = {
    responsive: true,

  };

  onSelectChange(value) {
    for( const item of this.spectrumlist){
      if( item.id === value){
        this.get(item.file);
        break;
      }
    }
    this.sd.selectedIndex = value;
  }

  private get(url: string): void {
    //const url = 'assets/spec/' + filename;
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
        }, 1000);

      },
      error => {
        console.log(error);
      }
    );
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
