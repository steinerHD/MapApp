import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if ( !navigator.geolocation ) {
  alert('El navegador no soporta la Geolocation');
  throw new Error("El navegador no soporta la Geolocation");
  
}

import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlaW5lcmhtIiwiYSI6ImNsOGh6OTZrZDBrN3IzbnFwaHQ0ZnYzbDgifQ.5xe7R6xks8NJJYX3UGdP0A';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
