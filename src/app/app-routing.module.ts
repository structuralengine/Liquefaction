import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { appExplain} from './appexplain.component';
import { appChart } from './appinput-chart.component';
import { appinputCondition } from './appinput-condition.component';
import { AppResultComponent } from './appresult.component';
import { appunderground} from './appinput-underground.component';
import { WaitDialogComponent } from './wait-dialog.component';

const routes: Routes = [
  { path: '', redirectTo:'explain', pathMatch: 'full' },
  { path: 'explain', component: appExplain },
  { path: 'chart', component: appChart },
  { path: 'underground', component: appunderground },
  { path: 'condition', component: appinputCondition },
  { path: 'wait', component: WaitDialogComponent },
  { path: 'result', component: AppResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
