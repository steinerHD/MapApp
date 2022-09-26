import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef

  constructor(private placesService: PlacesService,
    private mapService: MapService) { }

  ngAfterViewInit(): void {
    if ( !this.placesService.userLocation ) throw Error('No hay localizacion')
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placesService.userLocation,
      zoom: 14
    });
    
    const popup = new Popup()
  .setHTML(`
  <h6> Aqui estoy </h6>
  <span> Estoy en este lugar del mundo </span>
  `);


  new Marker({color: 'red'})
  .setLngLat( this.placesService.userLocation )
  .setPopup( popup )
  .addTo ( map );

  this.mapService.setMap(map);


  }

}
