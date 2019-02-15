import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from '../services/message.service';
import { MapsService } from "../services/maps.service";

@Component({
  selector: 'map-component',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() coordinates: Coordinates
  @Input() addMarkerCords: any
  private markers: any = []
  latitude: any = ''
  longitude: any = ''
  messages: any[] = [];
  subscription: Subscription;

  constructor(private mapsService: MapsService, private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.removeMarker(message)
      }
      else this.messages = []
    })
  }

  addMarker(cords) {
    let position = cords.currentValue
    position.id = this.mapsService.makeId()
    position.latitude = +position.latitude
    position.longitude = +position.longitude
    this.markers.push(position)
  }

  removeMarker(location) {
    let id = location.text.id
    this.markers.filter(marker => {
      if (marker.id === id) {
        let i = this.markers.indexOf(marker)
        this.markers.splice(i, 1)
      }
    })
  }

  setCords(cords: any) {
    this.latitude = +cords.latitude
    this.longitude = +cords.longitude
  }

  ngOnChanges(ev) {
    this.setCords(this.coordinates)
    if (ev.addMarkerCords) this.addMarker(ev.addMarkerCords)
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
