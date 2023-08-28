import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./features/countries/countriesSlice";
import parcelsReducer from "./features/parcelsSlice";

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    parcels: parcelsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
