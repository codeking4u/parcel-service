import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import ParcelInput from "../ParcelInput";
import Parcel from "../../types/ParcelType";
import {
  addParcel,
  updateParcel,
  removeParcel,
} from "../../features/parcelsSlice";

import { fetchQuote } from "../../features/quoteSlice";

import "./style.scss";

const ParcelInfoForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const parcels = useSelector((state: RootState) => state.parcels.parcels);
  const selectedOriginCountry = useSelector(
    (state: RootState) => state.countries.selectedOriginCountry
  );
  const selectedDestinationCountry = useSelector(
    (state: RootState) => state.countries.selectedDestinationCountry
  );

  const [packagePrices, setPackagePrices] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchParcelPrices = async () => {
      const allFieldsFilled = parcels.every(
        (parcel) =>
          parcel.width !== 0 &&
          parcel.weight !== 0 &&
          parcel.length !== 0 &&
          parcel.height !== 0
      );

      if (
        allFieldsFilled &&
        selectedOriginCountry &&
        selectedDestinationCountry
      ) {
        const quotePayload = {
          countryFrom: selectedOriginCountry,
          countryTo: selectedDestinationCountry,
          packages: parcels.map((parcel) => ({
            width: parcel.width,
            weight: parcel.weight,
            length: parcel.length,
            height: parcel.height,
          })),
        };

        try {
          const quoteResponse = await dispatch(fetchQuote());
          const newPackagePrices = quoteResponse.payload.packages.map(
            (pkg: any) => pkg.price
          );
          setPackagePrices(newPackagePrices);
          setTotalPrice(quoteResponse.payload.totalPrice);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchParcelPrices();
  }, [dispatch, parcels, selectedOriginCountry, selectedDestinationCountry]);

  const handleSubmit = () => {};

  return (
    <div className="parcel-form">
      <h2 className="comp-title">Parcel Information</h2>
      <button
        className="button"
        onClick={() =>
          dispatch(addParcel({ weight: 0, height: 0, width: 0, length: 0 }))
        }
      >
        Add Parcel
      </button>
      <div className="parcelInputs">
        {parcels.map((parcel, index) => (
          <ParcelInput
            key={index}
            parcel={parcel}
            onUpdate={(updatedParcel) =>
              dispatch(updateParcel({ index, parcel: updatedParcel }))
            }
            onRemove={() => dispatch(removeParcel(index))}
          />
        ))}
      </div>
      {parcels.map((_, index) => (
        <div key={index}>
          Parcel {index + 1} Price: {packagePrices[index]}
        </div>
      ))}
      <div>Total Price: {totalPrice}</div>
      <button onClick={handleSubmit}>Make an Order</button>
    </div>
  );
};

export default ParcelInfoForm;
