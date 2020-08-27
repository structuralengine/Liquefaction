import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SaverdataService } from './saverdata/saverdata.service';
import * as FileSaver from 'file-saver';
import {newArray} from '@angular/compiler/src/util';

@Component({
  selector: 'app-wait-dialog',
  templateUrl: './wait-dialog.component.html',
  styleUrls: ['./app.component.scss']
})
export class WaitDialogComponent implements OnInit {

  constructor(private router: Router,
              private http: HttpClient,
              private sd: SaverdataService) { }

  ngOnInit() {
    // スペクトルを取得
    for (const item of this.sd.spectrumlist) {
      if (item.id === this.sd.selectedIndex) {
        this.start(item.file);
        break;
      }
    }
  }

  // スペクトルを取得
  private get(url: string): void {
    //室内試験結果を集計
    const RN = this.getRN();
    if(RN.length<5){
      alert('室内試験R,Nciの入力が少ない');
      this.router.navigate(['/condition']);
      return;
    }
     
    //液状化を検討する深度の入力から有効な入力行を選択する
    const soik=[];
    for ( const colum of this.sd.conditionData1){
      //検討深さzの入力
      const depth : number = this.toNumber(colum[0])
      if(depth===null){
        continue;
      }
      //全上載厚σvと有効上載圧σv'を集計
      const sv = this.getSv(depth);
      if(sv === null){
        alert('水位の入力が正しくありません');
        this.router.navigate(['/undergorund']);
        return;
      }

      soil.push({
        "sv":sv.sv,
        "svd": sv.svd,
        "Z":depth,
        "RN":RN
      });
    }

    // 加速度を集計する
    this.http.get(url, { responseType: 'text' }).subscribe(
      data => {
        const yy: number[] = new Array();

        const lines = data.split('\n');
        let startpos: boolean = false;
        for (let i = 2; i < lines.length; i++) {
          const line: string = lines[i];
          const xy: string[] = line.trim().split(' ');
          const y: number = Number(xy[xy.length - 1]);
          if ( y !== 0 ) {
            yy.push(y);
          }
        }

        body['g'] = yy;　// 加速度を追加

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        
        const js: string = JSON.stringify(body);
        // const blob = new window.Blob([js], { type: 'text/plain' });
        // FileSaver.saveAs(blob, 'test.json');

        this.http.post(
          'https://asia-northeast1-the-structural-engine.cloudfunctions.net/function-1',
          js,
          httpOptions
        ).toPromise()
          .then((response) => {
            if ( 'error' in response ) {
              alert('解析に失敗しました\nエラーメッセージ：' + response['error']);
              this.router.navigate(['/condition']);
            }

            if ( 'results' in response ) {
              const relist: [] = response['results'];
              for ( let i = 0; i < relist.length; i++ ){
                const re = relist[i];
                if ( 'error' in re ) {
                  alert('解析に失敗しました\nエラーメッセージ：' + re['error']);
                  this.router.navigate(['/condition']);
                  return;
                }
                // 計算結果を処理
              const R: number = re['r'];
              const L: number = re['s'];
              const FL: number = re['t'];
              const u: boolean = re['u'];
              const j: string = (u===true) ? 'する' : 'しない';
              // 解析条件
              const Z = body.soil[i].Z; 
              const sv = body.soil[i].sv;
              const svd = body.soil[i].svd;

              //解析結果を格納する
              this.sd.resultData.push([Z,sv,svd,R,L,FL,j])
              }
              console.log(response);
              // 正常に処理が終了したら result 画面を表示する
              this.router.navigate(['/result']);
            }

          },
            error => {
              alert('解析に失敗しました\n通信状態：' + error.statusText + '\nエラーメッセージ：' + error.message);
              console.log(error);
              this.router.navigate(['/condition']);
            }
          );

      },
      error => {
        alert('スペクトルの読み込みに失敗しました\nエラーメッセージ：' + error);
      }      
    );
    
  }

  //全上載圧σvと有効上載厚σv’計算
  private getSV(depth:number):any{
    const result: any = { "sv":0, "svd":0};

    let totalH:number = 0;
    let weigth:number = 0;
    for ( const column of this.sd.undergroundData2 ){

      const height = this.toNumber(column[0])
      if(height === null ){
        continue;
      }
      const w = this.toNumber(column[1])
      if(w===null){
        continue;
      }
      weigth = w
      if (totalH + height > depth){
        break;
      }
      totalH += height;
      result.sv += height * weigth;
    }
    const height = depth - totalH;
    result.sv += height*weigth;

    if(this.sd.watertable === null){
      return null;
    }
    const up: number = depth - this.sd.watertable;
    const wp: number = 10*up;

    result.svd = result.sv - wp;

    return result;
  }

  //室内試験
　private getRN() : any[] {
    const result: any[] = new Array();
    for ( const colum of this.sd.conditionData2 ){
      const R = this.toNumber(colum[0]);
      if(R === null){
        continue
      }
      const N = this.toNumber(colum[1]);
      if(N===null){
        continue;
      }
      result.push([N,R]);
    }
    return result;
  }
  private toNumber(num: any):number {
    let result:number = null;
    try{
      const tmp:string = num.toString().trim();
      if(tmp.length > 0){
        result = ((n:number) => isNaN ? null : n)(+tmp);
      }
    }catch{
      result = null;
    }
    return result;
  }
}
