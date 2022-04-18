import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/common/city';
import { CityService } from 'src/app/service/city.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { CityWeather } from 'src/app/common/city-weather';
import { FormControl } from '@angular/forms';
import { PlaceDetails } from 'wft-geodb-angular-client/lib/model/place-details.model';
import { map, Observable, of, switchMap } from 'rxjs';
import { PlaceSummary } from 'wft-geodb-angular-client/lib/model/place-summary.model';
import { GeoDbService } from 'wft-geodb-angular-client';
import { AutoSuggestConstants } from 'src/app/common/auto-suggest-constants';
import { GeoResponse } from 'wft-geodb-angular-client/lib/model/geo-response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pop-up-model',
  templateUrl: './pop-up-model.component.html',
  styleUrls: ['./pop-up-model.component.css']
})
export class PopUpModelComponent implements OnInit {

  //Used to store City from autocomplete fild of input of PlaceSummary type
  cityName!: PlaceSummary;
  //used to store city information
  cityTemp = new City();
  private MIN_CITY_POPULATION = 40000;
  selectedCity!: PlaceDetails;
  cityControl!: FormControl;
  filteredCities!: Observable<PlaceSummary[]>;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  //used to store city list from database
  @Input() cities: CityWeather[] = [];

  constructor(private toastr: ToastrService, private geoDbService: GeoDbService, private router1: Router, private cityService: CityService) { }

  ngOnInit(): void {

    this.showCitySuggestion();
  }

  //this method used to store city in database
  saveCity() {

    this.cityTemp.cityName = this.cityName.name;
    if (this.cityName.name == undefined) {

      this.toastr.warning("Please select name from suggestions or enter correct city name", '');
    } else {

      this.cityService.saveCity(this.cityTemp).subscribe(response => {
        this.toastr.success(response, '');
        this.getCityList();
      }, error => {
        var err = JSON.parse(error.error)
        this.toastr.error(err.message, "");
      });
    }
  }

  //update drag and drop list
  drop(event: CdkDragDrop<CityWeather[]>) {

    moveItemInArray(this.cities, event.previousIndex, event.currentIndex);
    this.saveSortList(this.cities);
  }

  //get city list from databse
  getCityList() {

    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  //save sorted list into database
  saveSortList(cities: CityWeather[]) {

    this.cityService.saveSortList(cities).subscribe(data => {
      this.getCityList();
    });
  }

  //delet city from database
  deleteCity(id: number) {
    if (confirm("Do you want to delete city?")) {

      this.cityService.deleteCity(id).subscribe(response => {
        this.toastr.success(response, '');
        this.getCityList();
      }, error => {
        var err = JSON.parse(error.error)
        this.toastr.error(err.message, "");
      });
    }
  }

  //show weather detils after click view button from list
  viewCity(location1: string) {

    this.router1.navigateByUrl(`showWeather/${location1}`);
  }

  //Show city suggestion list by using autocomplete field
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
                    return response.data;
                  },
                  (error: any) => this.toastr.error(error)
                )
              );
          }
          return citiesObservable;
        })
      );
  }

  //return only city name for display in suggestion
  getCityDisplayName(city: PlaceSummary) {

    if (!city) {
      return '';
    }
    let name = city.name;
    return name;
  }

}
