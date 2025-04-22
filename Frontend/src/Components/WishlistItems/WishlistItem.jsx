import React, { useContext } from "react";
import "./WishlistItems.css";
import { ShopContext } from "../CartContext/ShopContext";
import cart_cross_icon from "../Assets/cart_cross_icon.png";

export const WishlistItems = () => {
  const { all_products, wishlistItems, removeFromWishlist, addToCart } =
    useContext(ShopContext);

  return (
    <div className="wishlistitems">
      <div className="wishlistitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Add to Cart</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_products.map((product) => {
        if (wishlistItems[product.id]) {
          return (
            <div key={product.id}>
              <div className="wishlistitem-format wishlistitem-format-main">
                <img
                  src={product.image}
                  alt={product.name}
                  className="wishlisticon-product-icon"
                />
                <p>{product.name}</p>
                <p>₹{product.new_price}</p>
                <button
                  className="wishlistitem-add-to-cart"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
                <img
                  className="wishlisticon-remove-icon"
                  src={cart_cross_icon}
                  alt="Remove"
                  onClick={() => removeFromWishlist(product.id)}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      {Object.values(wishlistItems).every((value) => !value) && (
        <div className="wishlistitems-empty">
          <p>Your wishlist is empty.</p>
        </div>
      )}
    </div>
  );
};

export default WishlistItems;