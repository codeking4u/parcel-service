import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./style.scss";

const OrderPage: React.FC = () => {
  const totalPrice = useSelector((state: RootState) => state.quote.totalPrice);

  return (
    <div className="container">
      <div className="order-confirmed">
        <p>Order Confirmed</p>
        <div className="checkmark">✔</div>
        <p>Amount Paid: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default OrderPage;
