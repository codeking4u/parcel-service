import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import CountriesState from "../types/CountryType";

const initialState: CountriesState = {
  countries: [],
  selectedOriginCountry: "",
  selectedDestinationCountry: "",
  loading: false,
  error: null,
};

const apiUrl = process.env.REACT_APP_API_URL;

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    fetchCountriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCountriesSuccess: (
      state,
      action: PayloadAction<{ id: string; name: string }[]>
    ) => {
      state.loading = false;
      state.countries = action.payload;
    },
    fetchCountriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedOriginCountry: (state, action: PayloadAction<string>) => {
      state.selectedOriginCountry = action.payload;
    },
    setSelectedDestinationCountry: (state, action: PayloadAction<string>) => {
      state.selectedDestinationCountry = action.payload;
    },
  },
});

export const {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,
  setSelectedOriginCountry,
  setSelectedDestinationCountry,
} = countriesSlice.actions;

export const fetchCountries =
  (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    dispatch(fetchCountriesStart());

    try {
      const response = await fetch(`${apiUrl}/api/countries`);
      const data = await response.json();
      console.log(data);
      dispatch(fetchCountriesSuccess(data));
    } catch (error) {
      dispatch(fetchCountriesFailure("Failed to fetch countries."));
    }
  };

export default countriesSlice.reducer;
