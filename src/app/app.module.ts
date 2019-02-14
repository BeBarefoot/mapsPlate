import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { GooglePlacesDirective } from './google-places.directive';
import { MapsComponent } from './maps/maps.component';
import { LocationsComponent } from './locations/locations.component';
import { FormsModule } from '@angular/forms';

const appRoute: Routes = [
  { path: '', component: SearchBarComponent  }
]

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    GooglePlacesDirective,
    MapsComponent,
    LocationsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAVgeusSx-0vfRX-9g6scTjRdfo9Bmrz0o'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
