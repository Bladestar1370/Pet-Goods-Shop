import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../../utils/apiFetch";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiFetch("http://localhost:4000/allproducts")
      .then((data) => {
        console.log('All products fetched:', data.length);
        setAllProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });

    const fetchData = async () => {
      const token = localStorage.getItem('auth-token');
      console.log('Auth token found:', token ? 'Yes' : 'No');
      if (token) {
        try {
          // Verify token by making a simple authenticated request
          await apiFetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token,
            },
          }).then((cartData) => {
            console.log('Cart data fetched:', cartData);
            setCartItems(cartData);
          });

          await apiFetch('http://localhost:4000/getwishlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token,
            },
          }).then((wishlistData) => {
            console.log('Wishlist data fetched:', wishlistData);
            setWishlistItems(wishlistData);
          });
        } catch (error) {
          console.error('Error fetching data:', error.message);
          if (error.message.includes('authenticate')) {
            console.warn('Invalid token detected, clearing auth-token');
            localStorage.removeItem('auth-token');
          }
        }
      } else {
        console.log('No auth token, skipping cart/wishlist fetch');
      }
    };
    fetchData();
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      apiFetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then(() => console.log('Added to cart'))
        .catch((error) => console.error('Error adding to cart:', error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) - 1 }));
    if (localStorage.getItem('auth-token')) {
      apiFetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then(() => console.log('Removed from cart'))
        .catch((error) => console.error('Error removing from cart:', error));
    }
  };

  const addToWishlist = (itemId) => {
    setWishlistItems((prev) => ({ ...prev, [itemId]: true }));
    if (localStorage.getItem("auth-token")) {
      apiFetch("http://localhost:4000/addtowishlist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then(() => console.log('Added to wishlist'))
        .catch((error) => console.error('Error adding to wishlist:', error));
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => ({ ...prev, [itemId]: false }));
    if (localStorage.getItem('auth-token')) {
      apiFetch("http://localhost:4000/removefromwishlist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then(() => console.log('Removed from wishlist'))
        .catch((error) => console.error('Error removing from wishlist:', error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
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
    loading,
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