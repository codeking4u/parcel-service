import React from "react";
import CountrySelectionForm from "../../components/CountrySelectionForm";
import ParcelInfoForm from "../../components/ParcelInfoForm";

const ParcelInfoPage = () => {
  return (
    <div className="App">
      <header>
        <h1>Shipping App</h1>
      </header>
      <CountrySelectionForm />
      <ParcelInfoForm />
    </div>
  );
};

export default ParcelInfoPage;
