import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage-angular";
import {Drivers} from '@ionic/storage';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({}), IonicStorageModule.forRoot({
      name: 'testdb',
      driverOrder: [Drivers.IndexedDB]
    })),
    provideRouter(routes),
    provideHttpClient(
    ),
  ],
});

