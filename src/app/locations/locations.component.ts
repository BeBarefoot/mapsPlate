import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { LocationsService } from "./locations.service";

@Component({
  selector: 'locations-list',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnChanges {
  private locations = []
  private action: string = 'Add Marker'
  @Input() coordinates: Coordinates
  @Output() locationEvent = new EventEmitter<any>()
  constructor(private locationService: LocationsService) { }

  ngOnChanges() {
    this.locationService.getLocationList()
      .subscribe(data => {
        data.map(location => {
          return location.distance = (this.locationService.calcDistance(this.coordinates.lat, this.coordinates.lng, location.lat, location.lng)
          )
        })
        this.locations = data
        this.locations.sort((a, b) => a.distance - b.distance)
      })
  }

  addMarker(location) {
    this.locationEvent.emit(location)
  }
}