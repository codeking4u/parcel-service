import React from "react";
import logo from "./logo.svg";
import "./App.scss";

import CountrySelectionForm from "./components/CountrySelectionForm";
import ParcelInfoForm from "./components/ParcelInfoForm";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Shipping App</h1>
      </header>
      <CountrySelectionForm />
      <ParcelInfoForm />
    </div>
  );
}

export default App;
