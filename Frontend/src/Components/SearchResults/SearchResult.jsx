import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ShopContext } from "../CartContext/ShopContext.jsx";
import "./SearchResults.css";

const SearchResults = () => {
  const { all_products, addToCart, addToWishlist } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      const filteredProducts = all_products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredProducts);
    } else {
      setResults([]);
    }
  }, [query, all_products]);

  return (
    <div className="search-results-page">
      <h2>Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <div className="product-grid">
          {results.map((product) => (
            <div key={product.id} className="item">
              <div className="item-content">
                <Link to={`/product/${product.id}`}>
                  <img
                    onClick={() => window.scrollTo(0, 0)}
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
                <div className="item-name">
                  <h3>{product.name}</h3>
                  <p className="item-description">
                    {product.category || "No category available"}
                  </p>
                  <div className="item-prices">
                    <div className="item-price">${product.new_price}</div>
                    {product.old_price && (
                      <div className="item-price-old">${product.old_price}</div>
                    )}
                  </div>
                  <div className="item-buttons">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="add-to-wishlist-btn"
                      onClick={() => addToWishlist(product.id)}
                    >
                      <i className="fa-regular fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchResults;





// // client/src/page/SearchResults.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import { ShopContext } from "../CartContext/ShopContext.jsx";
// import "./SearchResults.css"; // Add this for styling

// const SearchResults = () => {
//   const { all_products } = useContext(ShopContext);
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get("q") || ""; // Get query from URL
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     if (query.length > 0) {
//       const filteredProducts = all_products.filter((product) =>
//         product.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setResults(filteredProducts);
//     } else {
//       setResults([]);
//     }
//   }, [query, all_products]);

//   return (
//     <div className="search-results-page">
//       <h2>Search Results for "{query}"</h2>
//       {results.length > 0 ? (
//         <div className="product-grid">
//           {results.map((product) => (
//             <div key={product.id} className="product-card">
//               <Link to={`/product/${product.id}`}>
//                 <img src={product.image} alt={product.name} className="product-image" />
//                 <div className="product-info">
//                   <h3>{product.name}</h3>
//                   <p className="price">${product.new_price}</p>
//                   {product.old_price && (
//                     <p className="old-price">${product.old_price}</p>
//                   )}
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No products found for "{query}"</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;