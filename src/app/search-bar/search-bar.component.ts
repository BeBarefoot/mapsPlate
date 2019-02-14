import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  coordinates = {
    latitude: '',
    longitude: ''
  }
  addMarkerCords: any = {
    latitude: '',
    longitude: ''
  }
  isUserLocation: boolean = false
  ngOnInit() { }
  showMap: boolean = false
  public title = 'Places';

  setAddress(addrObj) {
    this.isUserLocation = false
    this.showMap = true
    this.zone.run(() => {
      this.coordinates.latitude = addrObj.lat
      this.coordinates.longitude = addrObj.lng
    });
  }
  showUserLocation() {
    this.showMap = true
    this.isUserLocation = true
  }
  markerLocation(ev: any) {
   return this.addMarkerCords = ev
  }

  constructor(private zone: NgZone) { }
}
