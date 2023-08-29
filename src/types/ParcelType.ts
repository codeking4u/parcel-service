export interface Parcel {
  weight: number;
  height: number;
  width: number;
  length: number;
}

export interface Package {
  width: number;
  weight: number;
  length: number;
  height: number;
  price: number;
}

export interface ParcelsState {
  parcels: Parcel[];
}

export interface ParcelInputProps {
  parcel: Parcel;
  onUpdate: (updatedParcel: Parcel) => void;
  onRemove: () => void;
}
