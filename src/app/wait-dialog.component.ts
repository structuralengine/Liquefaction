import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SaverdataService } from './saverdata/saverdata.service';

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
        this.get(item.file);
        break;
      }
    }
  }

  // スペクトルを取得
  private get(url: string): void {

    const body = {
      "soil": [
        {
          "sv": 76.3,
          "svd": 45.4,
          "Z": 4.35,
          "RN": [[25, 0.70], [32, 0.55], [40, 0.48], [48, 0.44], [55, 0.41], [63, 0.39], [71, 0.37], [78, 0.36], [86, 0.34], [99, 0.32]]
        }
      ]
    };

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

        body['g'] = yy;

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          })
        };

        this.http.post(
          'https://asia-northeast1-the-structural-engine.cloudfunctions.net/Liquefaction',
          JSON.stringify(body),
          httpOptions
        ).toPromise()
          .then((response) => {
            console.log(response);
            // 正常に処理が終了したら result 画面を表示する
            this.router.navigate(['/result']);
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
        console.log(error);
      }
    );
  }

}
