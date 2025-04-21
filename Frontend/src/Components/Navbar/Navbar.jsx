import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import "./Navbar.css";
import logo from "../Assets/logo1.jpg";
import { ShopContext } from "../CartContext/ShopContext";

export const Navbar = () => {
  const { getTotalCartItems, getTotalWishlistItems } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // For redirecting

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.length > 0) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`); // Redirect with query
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
                <button className="logout-button"
                  onClick={() => {
                    localStorage.removeItem("auth-token");
                    window.location.replace("/");
                  }}
                >
                  Logout
                </button>
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



            //  Good for search result at search bar

// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import logo from "../Assets/logo1.jpg";
// import { ShopContext } from "../CartContext/ShopContext"; // Adjust path if needed

// export const Navbar = () => {
//   const { getTotalCartItems, getTotalWishlistItems, all_products } = useContext(ShopContext);
//   const [searchQuery, setSearchQuery] = useState(""); // Tracks the search input
//   const [searchResults, setSearchResults] = useState([]); // Stores filtered results

//   // Handle search input and filter all_products
//   const handleSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (query.length > 0) {
//       const filteredProducts = all_products.filter((product) =>
//         product.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setSearchResults(filteredProducts);
//     } else {
//       setSearchResults([]); // Clear results if input is empty
//     }
//   };

//   return (
//     <header>
//       <section id="header">
//         <div className="logo">
//           <a href="/">
//             <img src={logo} width="100" alt="Logo" />
//           </a>
//         </div>
//         <div className="nav-search">
//           <input
//             placeholder="Search here"
//             className="search-input"
//             value={searchQuery}
//             onChange={handleSearch} // Trigger search on input change
//           />
//           <div className="search-icon">
//             <i className="fa-solid fa-magnifying-glass"></i>
//           </div>
//         </div>
//         <div>
//           <ul id="navbar">
//             <li className="border">
//               <Link to="/wishlist" aria-label="Go to wishlist">
//                 <i className="fa-regular fa-heart"></i>
//                 <span className="wishlist-count">{getTotalWishlistItems()}</span>
//               </Link>
//             </li>
//             <li className="border">
//               <Link to="/cart" aria-label="Go to cart">
//                 <i className="fa-solid fa-cart-shopping"></i>
//                 <span className="cart-count">{getTotalCartItems()}</span>
//               </Link>
//             </li>
//             <li className="border">
//               {localStorage.getItem("auth-token") ? (
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem("auth-token");
//                     window.location.replace("/");
//                   }}
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <Link to="/login" aria-label="Go to login/signup">
//                   <i className="fa-regular fa-user"></i>
//                 </Link>
//               )}
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

//       {/* Display search results */}
//       {searchQuery.length > 0 && (
//         <div className="search-results">
//           {searchResults.length > 0 ? (
//             searchResults.map((product) => (
//               <Link
//                 to={`/product/${product.id}`} // Link to product page
//                 key={product.id}
//                 className="search-result-item"
//                 onClick={() => setSearchQuery("")} // Clear search input on click
//               >
//                 <img src={product.image} alt={product.name} width="50" />
//                 <div>
//                   <p>{product.name}</p>
//                   <p>${product.new_price}</p>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p>No results found</p>
//           )}
//         </div>
//       )}
//     </header>
//   );
// };