import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StationComponent } from './pages/station/station.component';
import { StationDetailComponent } from './pages/station/components/station-detail/station-detail.component';
import { StoreModule } from '@ngrx/store';
import { stationReducer } from './redux/station/station.reducer';
import { StationCrudComponent } from './pages/station/components/station-crud/station-crud.component';
import { NgIf, NgStyle } from '@angular/common';
import { CircleButtonComponent } from './shared/components/circle-button/circle-button.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddButtonComponent } from '@pages/station/components/add-button/add-button.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    StationComponent,
    StationDetailComponent,
    StationCrudComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    NgIf,
    NgStyle,
    CircleButtonComponent,
    AddButtonComponent,
    StoreModule.forRoot({
      station: stationReducer,
    }),
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
