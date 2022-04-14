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
  count: number = 0;
  show : boolean =false;
  constructor(private router1: Router, private wheatherService: WeatherService,
    private cityService: CityService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.getCityList();
  }

  getCityList() {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
      this.show=true;
      this.router1.navigateByUrl(`showWeather/${this.cities[this.count].cityName}`);
    });
  }

  previousCity() {
    if (this.count > 0) {
   
      this.count--;
      console.log("previous = "+this.count);
      this.router1.navigateByUrl(`showWeather/${this.cities[this.count].cityName}`);
    }

  }

  nextCity() {
    if (this.count < this.cities.length-1) {
      this.count++;
      console.log("next ="+this.count);
      this.router1.navigateByUrl(`showWeather/${this.cities[this.count].cityName}`);
    }
  }
}


