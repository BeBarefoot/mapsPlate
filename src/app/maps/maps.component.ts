import { MapsService } from './maps.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'map-component',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges {
  @Input() coordinates: Coordinates
  @Input() isUserLocation: IsUserLocation
  @Input() addMarkerCords: addMarkerCords
  lat: string = ''
  lng: string = ''
  constructor(private map: MapsService) { }
  ngOnChanges() {
    if (this.isUserLocation) {
      this.map.getLocation().subscribe(data => {
        this.lat = data.latitude
        this.lng = data.longitude
      })
    }
    else {
      this.lat = this.coordinates.lat
      this.lng = this.coordinates.lng
    }
  }
  ngOnInit() {

  }

}
