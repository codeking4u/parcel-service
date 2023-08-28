import React from "react";
import logo from "./logo.svg";
import "./App.css";

import CountrySelectionForm from "./components/CountrySelectionForm";
import ParcelInfoForm from "./components/ParcelInfoForm";

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
