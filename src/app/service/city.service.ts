import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../common/city';
import { CityWeather } from '../common/city-weather';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseurl = 'http://localhost:9004/city';
  constructor(private httpClient: HttpClient) { }

  getCities(): Observable<CityWeather[]> {

    return this.httpClient.get<CityWeather[]>(this.baseurl + '/getCities');
  }

  saveCity(city: City): Observable<City> {

    return this.httpClient.post<City>(this.baseurl + '/saveCity', city);
  }

  deleteCity(id: number) {

    return this.httpClient.delete(`${this.baseurl + '/deleteCity'}/${id}`, { responseType: 'text' });
  }

  saveSortList(cities: CityWeather[]) {
    console.log(cities)
    return this.httpClient.post(this.baseurl + '/saveSortList', cities, { responseType: 'text' });
  }

}
