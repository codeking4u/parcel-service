interface CountriesState {
  countries: { id: string; name: string }[];
  selectedOriginCountry: string;
  selectedDestinationCountry: string;
  loading: boolean;
  error: string | null;
}

export default CountriesState;
