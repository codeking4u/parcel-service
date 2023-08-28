import React from "react";
import "./style.scss";

interface OrderReviewProps {
  packagePrices: number[];
  totalPrice: number;
  handleSubmit: () => void;
}

const OrderReview: React.FC<OrderReviewProps> = ({
  packagePrices,
  totalPrice,
  handleSubmit,
}) => {
  return totalPrice != 0 ? (
    <div className="order-review">
      <h2 className="comp-title"> Order review</h2>
      {packagePrices.map((price, index) => (
        <div key={index}>
          Package {index + 1} price : {price}
        </div>
      ))}
      <div className="total">Total Price: {totalPrice}</div>
      <button className="button" onClick={handleSubmit}>
        Make an Order
      </button>
    </div>
  ) : (
    <div></div>
  );
};

export default OrderReview;
