import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts'; 
import { AppResultComponent } from './appresult.component'
import { appChart } from './appinput-chart.component';
import { appinputCondition } from './appinput-condition.component';
import { appExplain } from './appexplain.component';
import { appunderground} from './appinput-underground.component';
import { WaitDialogComponent } from './wait-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AppResultComponent,
    appChart,
    appinputCondition,
    appExplain,
    appunderground,
    WaitDialogComponent
    ],
  imports: [
    HttpClientModule,
    FormsModule,
    ChartsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
