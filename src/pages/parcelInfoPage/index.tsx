import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CountrySelectionForm from "../../components/CountrySelectionForm";
import ParcelInfoForm from "../../components/ParcelInfoForm";

const ParcelInfoPage = () => {
  const selectedOriginCountry = useSelector(
    (state: RootState) => state.countries.selectedOriginCountry
  );
  const selectedDestinationCountry = useSelector(
    (state: RootState) => state.countries.selectedDestinationCountry
  );

  // Checking if both source and destination countries are selected
  const areCountriesSelected =
    selectedOriginCountry &&
    selectedDestinationCountry &&
    selectedOriginCountry != "none" &&
    selectedDestinationCountry != "none";
  return (
    <div className="App">
      <header>
        <h1>Shipping App</h1>
      </header>
      <CountrySelectionForm />
      {areCountriesSelected && <ParcelInfoForm />}
    </div>
  );
};

export default ParcelInfoPage;
