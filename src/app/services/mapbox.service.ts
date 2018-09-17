import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  private _map: mapboxgl.Map;
  private _mapResolvers: Function[];

  constructor( ) { }

  public createMap(
    element: HTMLElement
  ): Promise<mapboxgl.Map> {
    return new Promise<mapboxgl.Map>((resolve, reject) => {
      const mgl: any = mapboxgl;
      mgl.accessToken = environment.mapboxAccessToken;
      const map = new mapboxgl.Map({
        container: element,
        style: './assets/styles/satellite.json',
        center: [113.18, 23.14],
        zoom: 6,
        attributionControl: false,
        logoPosition: 'bottom-right'
      });
      map.on('load', () => {
        resolve(map);
      });
    });
  }

  public getMap(): Promise<mapboxgl.Map> {
    return new Promise<mapboxgl.Map>((resolve, reject) => {
      if (!!this._map) {
        resolve(this._map);
        return;
      }
      if (!this._mapResolvers) {
        this._mapResolvers = [];
      }
      this._mapResolvers.push(resolve);
    });
  }

  public setMap(map: mapboxgl.Map): void {
    this._map = map;
    if (!!this._mapResolvers) {
      this._mapResolvers.forEach(resolve => resolve(map));
    }
  }

  public removeCurrentMap(): void {
    if (this._map) {
      this._map.remove();
      this._map = null;
    }
  }

}



