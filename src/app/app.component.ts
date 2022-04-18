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

  //wether information
  weatherInfo!: RootObject;
  cities: CityWeather[] = [];
  count: number = 0;
  show: boolean = false;

  constructor(private router1: Router, private wheatherService: WeatherService,
    private cityService: CityService, private router: ActivatedRoute ) { }

  ngOnInit() {

    this.getCityList();
  }

  //get cities list from backend
  getCityList() {
    this.cityService.getCities().subscribe(data => {

      this.cities = data;
      this.show = true;
      this.router1.navigateByUrl(`showWeather/${this.cities[this.count].cityName}`);
    });
  }

  //show prevoius city weather information from cities list
  previousCity() {

    if (this.count > 0) {

      this.count--;
      this.router1.navigateByUrl(`showWeather/${this.cities[this.count].cityName}`);
    }
  }

  //show next city weather information from cities list
  nextCity() {

    if (this.count < this.cities.length - 1) {

      this.count++;
      this.router1.navigateByUrl(`showWeather/${this.cities[this.count].cityName}`);
    }
  }
}


