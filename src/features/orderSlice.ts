import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

const apiUrl = process.env.REACT_APP_API_URL;

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const selectedOriginCountry = state.countries.selectedOriginCountry;
    const selectedDestinationCountry =
      state.countries.selectedDestinationCountry;

    const payload = {
      countryFrom: selectedOriginCountry,
      countryTo: selectedDestinationCountry,
      packages: state.parcels.parcels.map((parcel) => ({
        width: parcel.width,
        weight: parcel.weight,
        length: parcel.length,
        height: parcel.height,
      })),
    };

    const response = await fetch(`${apiUrl}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {},
  reducers: {},
});

export default orderSlice.reducer;
