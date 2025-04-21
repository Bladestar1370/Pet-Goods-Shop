import React, { useContext } from "react";
import "./Item.css";
import { ShopContext } from "../CartContext/ShopContext";

export const Item = (props) => {
  const { addToCart, addToWishlist } = useContext(ShopContext);

  const handleButtonClick = (e, callback) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent click from bubbling to Link
    callback(props.id);
  };

  return (
    <div className="item">
      <div className="item-content">
        <img
          onClick={() => window.scrollTo(0, 0)}
          src={props.image}
          alt={props.name}
        />
        <div className="item-name">
          <h3>{props.name}</h3>
          <p className="item-description">
            {props.category || "No category available"}
          </p>
          <div className="item-prices">
            <div className="item-price">${props.new_price}</div>
          </div>
          <div className="item-buttons">
            <button
              className="add-to-cart-btn"
              onClick={(e) => handleButtonClick(e, addToCart)}
            >
              Add to Cart
            </button>
            <button
              className="add-to-wishlist-btn"
              onClick={(e) => handleButtonClick(e, addToWishlist)}
            >
              <i className="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;