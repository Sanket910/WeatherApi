import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { WeatherService } from './service/weather.service';

import { CurrentComponent } from './component/current/current.component';
import { HoursDataComponent } from './component/hours-data/hours-data.component';
import { WeekDataComponent } from './component/week-data/week-data.component';
import { AstroDataComponent } from './component/astro-data/astro-data.component';
import { AirQualityComponent } from './component/air-quality/air-quality.component';
import { UvIndexComponent } from './component/uv-index/uv-index.component';
import { CityService } from './service/city.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShowWeatherComponent } from './component/show-weather/show-weather.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpModelComponent } from './component/pop-up-model/pop-up-model.component';
import { CityListComponent } from './component/city-list/city-list.component';
import { AddCityComponent } from './component/add-city/add-city.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GeoDbFreeModule } from 'wft-geodb-angular-client';


@NgModule({
  declarations: [
    AppComponent,
    CurrentComponent,
    HoursDataComponent,
    WeekDataComponent,
    AstroDataComponent,
    AirQualityComponent,
    UvIndexComponent,
    ShowWeatherComponent,
    PopUpModelComponent,
    CityListComponent,
    AddCityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    GeoDbFreeModule.forRoot({
      apiKey: '',
      serviceUri: 'http://geodb-free-service.wirefreethought.com'
    }),
    
  ],
  providers: [WeatherService, CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
