import { MapsService } from './maps.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'map-component',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges {
  @Input() coordinates: Coordinates
  @Input() isUserLocation: boolean
  @Input() addMarkerCords: any
  lat: string = ''
  lng: string = ''

  constructor(private map: MapsService) { }

  setCords(cords: any) {
    this.lat = cords.latitude
    this.lng = cords.longitude
  }

  ngOnChanges() {
    if (this.isUserLocation) {
      this.map.getLocation().subscribe(data => {
        this.setCords(data)
      })
    }
    else this.setCords(this.coordinates)
  }
  ngOnInit() {

  }

}
