import { Component, OnInit } from '@angular/core';
import { RootObject } from 'src/app/common/root-object';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.css']
})
export class ShowWeatherComponent implements OnInit {
  weatherInfo!: RootObject;
  constructor(private wheatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherInfo = this.wheatherService.rootObj;
  }
}
