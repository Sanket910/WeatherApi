import { Component, Input, OnInit } from '@angular/core';
import { AstroToday } from 'src/app/common/astro-today';
import { RootObject } from 'src/app/common/root-object';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-astro-data',
  templateUrl: './astro-data.component.html',
  styleUrls: ['./astro-data.component.css']
})
export class AstroDataComponent implements OnInit {

  //Used to store Astrology of curuunt day
  astroToday = new AstroToday();
  //Used to store Weather information
  @Input() weatherInfo!: RootObject;

  constructor(private wheatherService: WeatherService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getAstroData();
  }

  // this method get Astrology data from Weather information.
  getAstroData() {
    for (let forcast of this.weatherInfo.forecast.forecastday) {

      this.astroToday.sunrise = forcast.astro.sunrise;
      this.astroToday.sunset = forcast.astro.sunset;
      for (let hour of forcast.hour) {

        if (hour.time > this.weatherInfo.current.last_updated) {

          this.astroToday.chance_of_rain = hour.chance_of_rain
          this.astroToday.humidity = hour.humidity
          this.astroToday.wind = hour.wind_dir + " " + hour.wind_mph;
          break;
        }
        break;
      }
    }
  }
}


