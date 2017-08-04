import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeaderboardComponent }      from './leaderboard.component';
import { MeasurementsComponent }      from './measurements.component';
import { RulesComponent }      from './rules.component';
import { FAQComponent }      from './faq.component';

import { AddComponent }      from './add.component';

const routes: Routes = [
  { path: 'index.php', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'measurements',     component: MeasurementsComponent },
  { path: 'leaderboard',     component: LeaderboardComponent },
  { path: 'rules',     component: RulesComponent },
  { path: 'faq',     component: FAQComponent },
  { path: 'add',     component: AddComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
