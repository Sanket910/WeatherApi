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

  private baseurl = 'http://localhost:8762/weather';

  getWeatherInfo(location: string): Observable<RootObject> {
    return this.httpClient.get<RootObject>(`${this.baseurl}/${location}`);
  }
}
