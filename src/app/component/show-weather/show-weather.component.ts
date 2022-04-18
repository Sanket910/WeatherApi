import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RootObject } from 'src/app/common/root-object';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.css']
})
export class ShowWeatherComponent implements OnInit {

  weatherInfo!: RootObject;
  name!: string;

  constructor(private toastr: ToastrService,private wheatherService: WeatherService, private router: ActivatedRoute) {

    //get city name from url
    router.params.subscribe(val => {
      this.getWeather(val['location']);
    });
  }

  ngOnInit(): void {
  }

  //get weather information using city name
  getWeather(location: string) {

    //console.log("inside get weather" + location)
    this.wheatherService.getWeatherInfo(location).subscribe(
      data => {
        this.weatherInfo = data;
      }
    );
  }
}
