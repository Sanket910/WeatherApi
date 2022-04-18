import { Component, Input, OnInit } from '@angular/core';
import { Hour } from 'src/app/common/hour';
import { RootObject } from 'src/app/common/root-object';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-hours-data',
  templateUrl: './hours-data.component.html',
  styleUrls: ['./hours-data.component.css']
})
export class HoursDataComponent implements OnInit {

  hours: Hour[] = [];
  count: number = 0;
//get weather details from parent component
  @Input() weatherInfo!: RootObject;

  constructor(private wheatherService: WeatherService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.count = 0
    this.hours = [];
    this.getHoursList();
  }

  //get hourly temprature of next 12 hours from current time
  getHoursList() {
    for (let forcast of this.weatherInfo.forecast.forecastday) {
      for (let hour of forcast.hour) {
        if (hour.time > this.weatherInfo.current.last_updated && this.count < 12) {
          this.hours[this.count] = hour;
          this.count++;
        }
      }
    }
  }
}
