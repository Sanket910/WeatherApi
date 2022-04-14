import { Component, Input, OnInit } from '@angular/core';
import { RootObject } from 'src/app/common/root-object';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-air-quality',
  templateUrl: './air-quality.component.html',
  styleUrls: ['./air-quality.component.css']
})
export class AirQualityComponent implements OnInit {
  @Input() weatherInfo!: RootObject;
  constructor(private wheatherService: WeatherService) { }

  ngOnInit(): void {

  }

}
