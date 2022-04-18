import { Component, Input, OnInit } from '@angular/core';
import { RootObject } from 'src/app/common/root-object';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  //Used to store Weather information
  @Input() weatherInfo!: RootObject;

  constructor(private wheatherService: WeatherService) { }

  ngOnInit(): void {
  }

}
