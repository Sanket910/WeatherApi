import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RootObject } from './common/root-object';
import { CityService } from './service/city.service';
import { WeatherService } from './service/weather.service';
import { CityWeather } from './common/city-weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  weatherInfo!: RootObject;
  cities: CityWeather[] = [];

  constructor(private router1: Router, private wheatherService: WeatherService, private cityService: CityService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.getCityList();
  }

  getCityList() {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
      this.getWeather(this.cities[0].city_name);
    });
  }

  getWeather(location: string) {
    this.wheatherService.getWeatherInfo(location).subscribe(
      data => {
        this.weatherInfo = data;
      //  console.log(this.weatherInfo);
        this.router1.navigate(['showWeather']);
      }
    );
  }
}


