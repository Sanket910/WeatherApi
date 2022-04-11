import { Forecast } from './forecast';
import { Current } from './current';
import { Location } from './location';
export class RootObject {
    location!: Location;
    current!: Current;
    forecast!: Forecast;
}
