import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {MdSidenav, MdDialog, MdDialogConfig, MdDialogRef, MdSnackBar, MdSelect} from '@angular/material';
import { JsonSchemaFormModule } from 'angular2-json-schema-form';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {nvD3} from 'ng2-nvd3';

import { AppComponent }         from './app.component';
import { LeaderboardComponent }      from './leaderboard.component';
import { MeasurementsComponent }      from './measurements.component';
import { RulesComponent }      from './rules.component';
import { FAQComponent }      from './faq.component';
import { AddComponent }      from './add.component';
import { DBService }          from './db.service';

@NgModule({
  imports: [
    BrowserModule,
	Ng2SmartTableModule,
	Ng2CompleterModule,
	FormsModule,
    ReactiveFormsModule,
    HttpModule,
	BrowserAnimationsModule,
    AppRoutingModule,
	JsonSchemaFormModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    AddComponent,
	LeaderboardComponent,
	RulesComponent,
	FAQComponent,
	nvD3,
	MeasurementsComponent
  ],
  providers: [ 
	DBService,
	CookieService 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
