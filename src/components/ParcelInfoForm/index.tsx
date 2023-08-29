import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import ParcelInput from "../ParcelInput";

import { useNavigate } from "react-router-dom";
import {
  addParcel,
  updateParcel,
  removeParcel,
} from "../../features/parcelsSlice";
import OrderReview from "../OrderReview";

import { fetchQuote } from "../../features/quoteSlice";

import { createOrder } from "../../features/orderSlice";

import "./style.scss";

const ParcelInfoForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    try {
      const response = await dispatch(createOrder());

      console.log("response before", response);
      navigate("/order", { state: response });
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="parcelInput-wrapper" key={index}>
            <label className="parcel-title"> Package {index + 1} </label>
            <ParcelInput
              key={index}
              parcel={parcel}
              onUpdate={(updatedParcel) =>
                dispatch(updateParcel({ index, parcel: updatedParcel }))
              }
              onRemove={() => dispatch(removeParcel(index))}
            />
          </div>
        ))}
      </div>
      <OrderReview
        packagePrices={packagePrices}
        totalPrice={totalPrice}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ParcelInfoForm;
