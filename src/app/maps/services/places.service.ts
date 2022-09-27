import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public userLocation!: [number, number] ;
  public isLoadingplaces:boolean = false;
  public places: Feature[] = [];
  get isUserLocationReady() {
    return !!this.userLocation;
  }
  constructor(private placesApi: PlacesApiClient,
    private mapService: MapService) { 
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

  getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.isLoadingplaces = false;
      this.places = [];
    }
    if (!this.userLocation ) throw Error('No esta listo la localizacion')


    this.isLoadingplaces = true;

    

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
    .subscribe( resp => {
      this.isLoadingplaces = false;
      this.places = resp.features;

      this.mapService.createMarkersFromPlaces( this.places, this.userLocation );
    } );

  }


  deletePlaces() {
    this.places = [];
  }

}
