import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  coordinates: any = ''
  addMarkerCords: any = ''
  isUserLocation: boolean = false
  ngOnInit() { }
  showMap: boolean = false
  public title = 'Places';

  setAddress(addrObj) {
    this.isUserLocation = false
    this.showMap = true
    this.zone.run(() => {
      this.coordinates = addrObj
    });
  }
  showUserLocation() {
    this.showMap = true
    this.isUserLocation = true
  }
  markerLocation(ev) {
    this.addMarkerCords = ev
  }

  constructor(private zone: NgZone) { }
}
