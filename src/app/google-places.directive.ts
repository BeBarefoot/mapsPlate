import { Directive, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

declare var google: any;

@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }

  getFormattedAddress(place) {
    let location_obj = {};
    location_obj['formatted_address'] = place.formatted_address;
    location_obj['lat'] = place.geometry.viewport.ma.l;
    location_obj['lng'] = place.geometry.viewport.ga.l;
    return location_obj;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
    });
  }

}
