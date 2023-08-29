import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

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

    const response = await fetch("http://localhost:8000/api/order", {
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
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      // Handle successful order creation if needed
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      // Handle order creation error if needed
    });
  },
});

export default orderSlice.reducer;
