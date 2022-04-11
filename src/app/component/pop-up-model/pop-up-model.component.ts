import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/common/city';
import { CityService } from 'src/app/service/city.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { CityWeather } from 'src/app/common/city-weather';
import { FormControl } from '@angular/forms';
import { PlaceDetails } from 'wft-geodb-angular-client/lib/model/place-details.model';
import { map, Observable, of, startWith, switchMap } from 'rxjs';
import { PlaceSummary } from 'wft-geodb-angular-client/lib/model/place-summary.model';
import { GeoDbService } from 'wft-geodb-angular-client';
import { AutoSuggestConstants } from 'src/app/common/auto-suggest-constants';
import { GeoResponse } from 'wft-geodb-angular-client/lib/model/geo-response.model';

@Component({
  selector: 'app-pop-up-model',
  templateUrl: './pop-up-model.component.html',
  styleUrls: ['./pop-up-model.component.css']
})
export class PopUpModelComponent implements OnInit {
  cityName!: PlaceSummary;
  cityTemp = new City();
  cities: CityWeather[] = [];
  private MIN_CITY_POPULATION = 40000;
  selectedCity!: PlaceDetails;
  cityControl!: FormControl;
  filteredCities!: Observable<PlaceSummary[]>;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  constructor(private geoDbService: GeoDbService, private router1: Router, private cityService: CityService) { }

  ngOnInit(): void {
    this.getCityList();
    this.showCitySuggestion();
  }

  saveCity() {
    this.cityTemp.city_name = this.cityName.name;
    if (this.cityName.name == undefined) {
      alert("City Name is not Correct...!")
    } else {
      this.cityService.saveCity(this.cityTemp).subscribe(data => {
        this.getCityList();
      });
    }
  }

  drop(event: CdkDragDrop<CityWeather[]>) {
    moveItemInArray(this.cities, event.previousIndex, event.currentIndex);
    this.saveSortList(this.cities);
  }

  getCityList() {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  saveSortList(cities: CityWeather[]) {
    this.cityService.saveSortList(cities).subscribe(data => {
      console.log(data);
      this.getCityList();
    });
  }

  deleteCity(id: number) {
    this.cityService.deleteCity(id).subscribe(data => {
      alert(data);
      this.getCityList();
    })
  }

  showCitySuggestion() {

    this.cityControl = new FormControl();

    this.filteredCities = this.cityControl.valueChanges
      .pipe(
        switchMap((cityNamePrefix: string) => {
          let citiesObservable: Observable<PlaceSummary[]> = of([]);
          if (cityNamePrefix && cityNamePrefix.length >= AutoSuggestConstants.MIN_INPUT_LENGTH) {
            citiesObservable = this.geoDbService.findPlaces({
              namePrefix: cityNamePrefix,
              minPopulation: this.MIN_CITY_POPULATION,
              types: ['CITY'],
              sortDirectives: ['-population'],
              limit: AutoSuggestConstants.MAX_SUGGESTIONS,
              offset: 0
            })
              .pipe(
                map(
                  (response: GeoResponse<PlaceSummary[]>) => {
                    console.log(response.data)
                    return response.data;
                  },
                  (error: any) => console.log(error)
                )
              );
          }
          return citiesObservable;
        })
      );
  }

  getCityDisplayName(city: PlaceSummary) {
    if (!city) {
      return '';
    }
    let name = city.name;
    return name;
  }

}