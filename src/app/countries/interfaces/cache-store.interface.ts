import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface CountriesStore {
  byCapital: TermCountries;
  byCountry: TermCountries;
  byRegion: RegionCountries;
}

export interface TermCountries {
  term: string;
  countries: Country[];
}

interface RegionCountries {
  region?: Region | null;
  countries: Country[];
}
