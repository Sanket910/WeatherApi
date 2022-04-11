import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowWeatherComponent } from './component/show-weather/show-weather.component';

const routes: Routes = [
  { path: 'showWeather', component: ShowWeatherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
