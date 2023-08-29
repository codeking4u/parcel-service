import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocation } from "react-router-dom";
import "./style.scss";

const OrderPage: React.FC = () => {
  const location = useLocation();
  const response = location.state.payload;
  const totalPrice = useSelector((state: RootState) => state.quote.totalPrice);

  return (
    <div className="container">
      <div className="order-confirmed">
        <p>{response.message}</p>
        <div className="checkmark">✔</div>
        <p>Amount Paid: €{response.totalPrice}</p>
      </div>
    </div>
  );
};

export default OrderPage;
