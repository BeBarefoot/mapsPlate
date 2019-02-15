import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Location {
  name: any,
  address: any,
  lat: number,
  lng: number,
  distance: number
}

@Injectable({
  providedIn: 'root'
})

export class LocationsService {
  _url: string = ('assets/data.json')

  constructor(private http: HttpClient) {
  }
  getLocationList(): Observable<any[]> {
    return this.http.get<Location[]>(this._url)
  }
  findBestSupermarket(locations: any) {
    let locationArray = []
    locations.forEach(location => locationArray.push(location.name)
    )
    let newArr = locationArray.sort()
    let most = [undefined, 0]
    let counter = 0
    newArr.reduce((old, next) => {
      old == next ? ++counter > most[1] && (most = [next, counter]) : (counter = 1)
      return next
    })
    return most[0]
  }

  calcDistance(cords1, cords2) {
    cords2.latitude
    if ((cords1.latitude == cords2.latitude) && (cords1.longitude == cords2.longitude)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * cords1.latitude / 180;
      var radlat2 = Math.PI * cords2.latitude / 180;
      var theta = cords1.longitude - cords2.longitude;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344
      return dist.toFixed(2);
    }
  }

}
