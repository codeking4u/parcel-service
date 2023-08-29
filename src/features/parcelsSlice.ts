// features/parcels/parcelsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Parcel, ParcelsState } from "../types/ParcelType";

const initialState: ParcelsState = {
  parcels: [],
};

const parcelsSlice = createSlice({
  name: "parcels",
  initialState,
  reducers: {
    addParcel: (state, action: PayloadAction<Parcel>) => {
      state.parcels.push(action.payload);
    },
    updateParcel: (
      state,
      action: PayloadAction<{ index: number; parcel: Parcel }>
    ) => {
      state.parcels[action.payload.index] = action.payload.parcel;
    },
    removeParcel: (state, action: PayloadAction<number>) => {
      state.parcels.splice(action.payload, 1);
    },
  },
});

export const { addParcel, updateParcel, removeParcel } = parcelsSlice.actions;

export default parcelsSlice.reducer;

export const selectParcels = (state: RootState) => state.parcels.parcels;
