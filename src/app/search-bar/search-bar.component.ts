import { Component, NgZone, OnInit } from '@angular/core';
import { MapsService } from '../maps/getUserLocation.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  constructor(private zone: NgZone, private map: MapsService) { }

  formInput: string = ''

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

  setAddress(addrObj: any) {
    this.isUserLocation = false
    this.showMap = true
    this.coordinates = addrObj
    this.zone.run(() => {
      this.coordinates.latitude = addrObj.lat
      this.coordinates.longitude = addrObj.lng
    })
  }
  showUserLocation() {
    this.formInput = ''
    this.map.getLocation().subscribe(data => {
      this.coordinates = data
      this.showMap = true
    })
  }
  markerLocation(ev: any) {
    this.addMarkerCords = ev
  }
}
