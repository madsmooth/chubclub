import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import 'hammerjs';
import 'd3';
import 'nvd3';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
