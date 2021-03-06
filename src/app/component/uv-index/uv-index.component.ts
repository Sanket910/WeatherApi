import { Component, Input, OnInit } from '@angular/core';
import { RootObject } from 'src/app/common/root-object';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-uv-index',
  templateUrl: './uv-index.component.html',
  styleUrls: ['./uv-index.component.css']
})
export class UvIndexComponent implements OnInit {

  //get weather information from parent component
  @Input() weatherInfo!: RootObject;
  
  constructor(private wheatherService: WeatherService) { }

  ngOnInit(): void {
  }

}
