import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RootObject } from '../common/root-object';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  rootObj = new RootObject();

  constructor(private httpClient: HttpClient) { }

  private baseurl = 'http://localhost:9004/weather';
  headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };

  getWeatherInfo(location: string): Observable<RootObject> {
    return this.httpClient.get<RootObject>(`${this.baseurl + '/getWeather'}/${location}`).pipe(
      map(data =>
        this.rootObj = data
      )
    );
  }
}
