import React from "react";
import { Parcel } from "../../types/ParcelType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { ParcelInputProps } from "../../types/ParcelType";

const ParcelInput: React.FC<ParcelInputProps> = ({
  parcel,
  onUpdate,
  onRemove,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Parcel
  ) => {
    const updatedParcel = { ...parcel, [key]: parseFloat(e.target.value) };
    onUpdate(updatedParcel);
  };

  return (
    <div className="parcel-input">
      <div className="input-container">
        <label>Weight (kg)</label>
        <input
          type="number"
          value={parcel.weight}
          onChange={(e) => handleInputChange(e, "weight")}
          placeholder="Weight"
        />
      </div>

      <div className="input-container">
        <label>Height (cms)</label>
        <input
          type="number"
          value={parcel.height}
          onChange={(e) => handleInputChange(e, "height")}
        />
      </div>

      <div className="input-container">
        <label>Width (cms)</label>
        <input
          type="number"
          value={parcel.width}
          onChange={(e) => handleInputChange(e, "width")}
        />
      </div>

      <div className="input-container">
        <label>Length (cms)</label>
        <input
          type="number"
          value={parcel.length}
          onChange={(e) => handleInputChange(e, "length")}
        />
      </div>

      <button className="del-button" onClick={onRemove}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default ParcelInput;
