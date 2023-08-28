import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  setSelectedOriginCountry,
  setSelectedDestinationCountry,
} from "../../features/countries/countriesSlice";
import { RootState, AppDispatch } from "../../store";
import Dropdown from "../../ui/Dropdown";

const CountrySelectionForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const selectedOriginCountry = useSelector(
    (state: RootState) => state.countries.selectedOriginCountry
  );
  const selectedDestinationCountry = useSelector(
    (state: RootState) => state.countries.selectedDestinationCountry
  );

  const loading = useSelector((state: RootState) => state.countries.loading);
  const error = useSelector((state: RootState) => state.countries.error);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("countries = " + countries);

  const originCountryOptions = countries?.map((country) => ({
    value: country.name,
    id: country.id,
  }));

  const destinationCountryOptions = countries?.map((country) => ({
    value: country.name,
    id: country.id,
  }));

  return (
    <div className="country-selection-form">
      <h2>Country Selection</h2>
      <div className="form-section">
        <label>Origin Country:</label>
        <Dropdown
          value={selectedOriginCountry}
          onChange={(value) => dispatch(setSelectedOriginCountry(value))}
          options={originCountryOptions}
        />
      </div>
      <div className="form-section">
        <label>Destination Country:</label>
        <Dropdown
          value={selectedDestinationCountry}
          onChange={(value) => dispatch(setSelectedDestinationCountry(value))}
          options={destinationCountryOptions}
        />
      </div>
    </div>
  );
};

export default CountrySelectionForm;
