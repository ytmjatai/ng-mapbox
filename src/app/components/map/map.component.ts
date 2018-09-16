import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MapboxService } from '../../services/mapbox.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('mapEl')
  public mapEl: ElementRef;
  constructor(
    private mapbox: MapboxService
  ) { }

  ngOnInit() {
    const map =  this.mapbox.createMap(
      this.mapEl.nativeElement
    );
  }

}
