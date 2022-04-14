import { Component, Input, OnInit } from '@angular/core';

import { RootObject } from 'src/app/common/root-object';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-week-data',
  templateUrl: './week-data.component.html',
  styleUrls: ['./week-data.component.css']
})
export class WeekDataComponent implements OnInit {
  @Input() weatherInfo!: RootObject;

  constructor(private wheatherService: WeatherService) { }

  ngOnInit(): void {
  }

}
