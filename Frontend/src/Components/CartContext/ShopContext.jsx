import React, { createContext, useContext, useState, useEffect } from "react";

export const ShopContext = createContext();

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const getDefaultWishlist = () => {
  let wishlist = {};
  for (let index = 0; index < 300 + 1; index++) {
    wishlist[index] = false;
  }
  return wishlist;
};

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [wishlistItems, setWishlistItems] = useState(getDefaultWishlist());
  const [all_products, setAllProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAllProducts(data));

      if(localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/getcart', {
          method: 'POST',
          headers: {
            Accept:'appication/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
          },
          body:"",
        }).then((response)=>response.json())
        .then((data)=>setCartItems(data));
      }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) - 1 }));
    if(localStorage.getItem('auth-token')) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

  };

  const addToWishlist = (itemId) => {
    setWishlistItems((prev) => ({ ...prev, [itemId]: true }));
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => ({ ...prev, [itemId]: false }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
      
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const getTotalWishlistItems = () => {
    let totalItem = 0;
    for (const item in wishlistItems) {
      if (wishlistItems[item]) {
        totalItem += 1;
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    getTotalWishlistItems,
    all_products,
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export const useCart = () => {
  return useContext(ShopContext);
};

export const useWishlist = () => {
  return useContext(ShopContext);
};
