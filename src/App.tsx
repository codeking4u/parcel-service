import React from "react";
import logo from "./logo.svg";
import "./App.css";

import CountrySelectionForm from "./components/OrderForm/CountrySelectionForm";
import ParcelInfoForm from "./components/OrderForm/ParcelInfoForm";

function App() {
  return (
    <div className="App">
      <header>ABC</header>
      <CountrySelectionForm />
      <ParcelInfoForm />
    </div>
  );
}

export default App;
