import { Injectable } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public userLocation!: LngLatLike;
  get isUserLocationReady() {
    return !!this.userLocation;
  }
  constructor() { 
    this.getUserLocation()
  }

  public  async getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude]
          resolve(this.userLocation);
        },
         ( err ) => {
          alert('No se pudo obtener la geolocalizacion')
          console.log(err);
          reject()
         }
      );

    });
  }

}
