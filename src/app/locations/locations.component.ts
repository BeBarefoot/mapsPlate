import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { LocationsService } from "./locations.service";

@Component({
  selector: 'locations-list',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnChanges {
  private locations: any = []
  private action: string = 'Add Marker'
  @Input() coordinates: Coordinates
  @Output() locationEvent = new EventEmitter<any>()
  constructor(private locationService: LocationsService) { }

  calcDistance(cords,location){
    this.locationService.calcDistance(cords.lat, cords.lng, location.lat, location.lng)
  }

  ngOnChanges() {
    this.locationService.getLocationList()
      .subscribe(data => {
        data.map(location => {
           location.distance = this.calcDistance(this.coordinates, location)
        })
        this.locations = data
        this.locations.sort((a, b) => a.distance - b.distance)
      })
  }
  addMarker(location) {
    this.locationEvent.emit(location)
  }
}
