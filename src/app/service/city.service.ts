import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../common/city';
import { CityWeather } from '../common/city-weather';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseurl = 'http://localhost:8762/city';
  constructor(private httpClient: HttpClient) { }

  getCities(): Observable<CityWeather[]> {

    return this.httpClient.get<CityWeather[]>(this.baseurl);
  }

  saveCity(city: City) {

    return this.httpClient.post(this.baseurl, city, { responseType: 'text' });
  }

  deleteCity(id: number) {

    return this.httpClient.delete(`${this.baseurl}/${id}`, { responseType: 'text' });
  }

  saveSortList(cities: CityWeather[]) {

    return this.httpClient.post(this.baseurl + '/saveSortList', cities, { responseType: 'text' });
  }

}
