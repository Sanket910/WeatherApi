import { Astro } from './astro';
import { Day } from './day';
import { Hour } from './hour';

export class Forecastday {
    date!: Date;
    date_epoch!: number;
    day!: Day;
    astro!: Astro;
    hour!: Hour[];
}
