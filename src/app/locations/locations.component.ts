import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { LocationsService } from "./locations.service";

@Component({
  selector: 'locations-list',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnChanges {
  bestSupermarket: any
  numberOfResults: number = 5
  private locations: any = []
  private action: string = 'Add Marker'
  @Input() coordinates: Coordinates
  @Output() locationEvent = new EventEmitter<any>()
  constructor(private locationService: LocationsService) { }

  calcDistance(cords, location) {
    return this.locationService.calcDistance(cords, location)
  }

  ngOnChanges() {
    this.locationService.getLocationList()
      .subscribe(data => {
        data.map(location => {
          location.distance = this.calcDistance(this.coordinates, location)
        })
        data.sort((a, b) => a.distance - b.distance)
        this.locations = data.slice(0, this.numberOfResults)
        this.bestSupermarket = this.locationService.findBestSupermarket(this.locations)
      })
  }
  addMarker(location: any) {
    this.locationEvent.emit(location)
  }
}
