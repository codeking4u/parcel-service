import { Package } from "./ParcelType";

export interface QuoteState {
  packages: Package[];
  totalPrice: number;
}
