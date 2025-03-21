import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo1.jpg";
import { ShopContext } from "../CartContext/ShopContext";

export const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const { getTotalWishlistItems } = useContext(ShopContext);

  return (
    <header>
      <section id="header">
        <div className="logo">
          <a href="/">
            <img src={logo} width="100" alt="Logo" />
          </a>
        </div>
        <div className="nav-search">
          <input placeholder="Search here" className="search-input" />
          <div className="search-icon">
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
              <Link to="/login" aria-label="Go to login/signup">
                <i className="fa-regular fa-user"></i>
              </Link>
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
          <p>Toys Sale</p>
          <p>Dogs</p>
          <p>Cats</p>
          <p>Small Animals</p>
          <p>Pharmacy</p>
        </div>
      </div>
    </header>
  );
};

// // Navbar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import logo from "../Assets/logo1.jpg";

// export const Navbar = () => {

//   return (
//     <header>
//       <section id="header">
//         <div className="logo">
//           <a href="#">
//             <img src={logo} width="100" alt="Logo" />
//           </a>
//         </div>
//         <div className="nav-search">
//           <input placeholder="Search here" className="search-input" />
//           <div className="search-icon">
//             <i className="fa-solid fa-magnifying-glass"></i>
//           </div>
//         </div>
//         <div>
//           <ul id="navbar">
//             <li className="border">
//               <Link to="/wishlist" aria-label="Go to wishlist">
//                 <i className="fa-regular fa-heart"></i>
//                 <span className="wishlist-count">{wishlistCount}</span>
//               </Link>
//             </li>
//             <li className="border">
//               <Link to="/cart" aria-label="Go to cart">
//                 <i className="fa-solid fa-cart-shopping"></i>
//                 <span className="cart-count">{cartCount}</span>
//               </Link>
//             </li>
//             <li className="border">
//               <Link to="/login" aria-label="Go to login/signup">
//                 <i className="fa-regular fa-user"></i>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </section>
//       <div className="panel">
//         <div className="panel-all border">
//           <i className="fa-solid fa-bars"></i>
//           All
//         </div>
//         <div className="panel-ops">
//           <p>Toys Sale</p>
//           <p>Dogs</p>
//           <p>Cats</p>
//           <p>Small Animals</p>
//           <p>Pharmacy</p>
//         </div>
//       </div>
//     </header>
//   );
// };
