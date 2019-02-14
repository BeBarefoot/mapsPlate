import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'map-component',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges {
  @Input() coordinates: Coordinates
  @Input() addMarkerCords: any
  latitude: string = ''
  longitude: string = ''

  setCords(cords: any) {
    this.latitude = cords.latitude
    this.longitude = cords.longitude
  }

  ngOnChanges() {
    this.setCords(this.coordinates)
  }
  ngOnInit() {
  }

}
