import React from "react";

interface Parcel {
  weight: number;
  height: number;
  width: number;
  length: number;
}

interface ParcelInputProps {
  parcel: Parcel;
  onUpdate: (updatedParcel: Parcel) => void;
  onRemove: () => void;
}

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
      <input
        type="number"
        value={parcel.weight}
        onChange={(e) => handleInputChange(e, "weight")}
        placeholder="Weight"
      />
      <input
        type="number"
        value={parcel.height}
        onChange={(e) => handleInputChange(e, "height")}
      />
      <input
        type="number"
        value={parcel.width}
        onChange={(e) => handleInputChange(e, "width")}
      />
      <input
        type="number"
        value={parcel.length}
        onChange={(e) => handleInputChange(e, "length")}
      />
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default ParcelInput;
