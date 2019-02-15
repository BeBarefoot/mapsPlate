import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { LocationsService } from "../services/locations.service";
import { MessageService } from '../services/message.service';

@Component({
  selector: 'locations-list',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnChanges, OnInit {
  bestSupermarket: any
  numberOfResults: number = 5
  private locations: any = []
  private action: string = 'Add Marker'

  @Input() coordinates: Coordinates
  @Output() locationEvent = new EventEmitter<any>()

  constructor(private locationService: LocationsService, private messageService: MessageService) { }

  calcDistance(cords, location) {
    return this.locationService.calcDistance(cords, location)
  }

  sendMessage(msg): void {
    this.messageService.sendMessage(msg)
  }

  clearMessages(): void {
    this.messageService.clearMessages()
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
  addMarker(location: any, ev) {
    (ev.path[0].innerText === this.action) ?
      (ev.path[0].innerText = 'Remove Marker', this.locationEvent.emit(location))
      : (ev.path[0].innerText = 'Add Marker', this.sendMessage(location))

  }
  ngOnInit(): void {
  }
}
