import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo1.jpg";
import { ShopContext } from "../CartContext/ShopContext";

export const Navbar = () => {
  const { getTotalCartItems, getTotalWishlistItems } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.length > 0) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header>
      <section id="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} width="100" alt="Logo" />
          </Link>
        </div>
        <div className="nav-search">
          <input
            placeholder="Search here"
            className="search-input"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <div className="search-icon" onClick={handleSearchClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div>
          <ul id="navbar">
            <li className="border">
              <Link to="/wishlist" aria-label="Go to wishlist">
                <i className="fa-regular fa-heart"></i>
                <span className="wishlist-count">{getTotalWishlistItems()}</span>
              </Link>
            </li>
            <li className="border">
              <Link to="/cart" aria-label="Go to cart">
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="cart-count">{getTotalCartItems()}</span>
              </Link>
            </li>
            <li className="border">
              {localStorage.getItem("auth-token") ? (
                <Link to="/profile" aria-label="Go to profile">
                  <i className="fa-regular fa-user"></i>
                </Link>
              ) : (
                <Link to="/login" aria-label="Go to login/signup">
                  <i className="fa-regular fa-user"></i>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </section>
      <div className="panel">
        <div className="panel-all border">
          <i className="fa-solid fa-bars"></i>
          All
        </div>
        <div className="panel-ops">
          <Link className="panel-link" to="/product-type/toy">
            Toys Sale
          </Link>
          <Link className="panel-link" to="/category/dog">
            Dogs
          </Link>
          <Link className="panel-link" to="/category/cat">
            Cats
          </Link>
          <Link className="panel-link" to="/category/rabbit">
            Small Animals
          </Link>
          <Link className="panel-link" to="/product-type/medicine">
            Pharmacy
          </Link>
        </div>
      </div>
    </header>
  );
};