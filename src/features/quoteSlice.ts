import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Package {
  width: number;
  weight: number;
  length: number;
  height: number;
  price: number;
}

interface QuoteState {
  packages: Package[];
  totalPrice: number;
}

const initialState: QuoteState = {
  packages: [],
  totalPrice: 0,
};

export const fetchQuote = createAsyncThunk("quote/fetchQuote", fetchQuoteAsync);

async function fetchQuoteAsync(_: void, thunkAPI: any) {
  const state = thunkAPI.getState() as RootState;
  const originCountry = state.countries.selectedOriginCountry;
  const destinationCountry = state.countries.selectedDestinationCountry;
  const packages = state.parcels.parcels.map((parcel) => ({
    width: parcel.width,
    weight: parcel.weight,
    length: parcel.length,
    height: parcel.height,
  }));

  const payload = {
    countryFrom: originCountry,
    countryTo: destinationCountry,
    packages: packages,
  };

  try {
    const response = await fetch("http://localhost:8000/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }

    const data = await response.json();
    return data.quote;
  } catch (error) {
    throw new Error("Failed to fetch quote");
  }
}

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuote.fulfilled, (state, action) => {
      state.packages = action.payload.packages;
      state.totalPrice = action.payload.totalPrice;
    });
  },
});

export default quoteSlice.reducer;
