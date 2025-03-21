import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./CategoryProducts.css";
import Item from "../Item/Item"; // Adjust the path as needed
import { ShopContext } from "../CartContext/ShopContext"; // Import the context

const CategoryProducts = () => {
  const { name } = useParams();
  const { all_products: allProducts } = useContext(ShopContext); // Use context to get allProducts
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (allProducts) {
      const filteredProducts = allProducts.filter((product) =>
        product.category.toLowerCase().includes(name.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [name, allProducts]);

  return (
    <div className="category-products">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)} Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="product-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item
              id={product.id}
              name={product.name}
              image={product.image}
              category={product.category}
              new_price={product.new_price}
              old_price={product.old_price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
// // CategoryProducts.js
// import './CategoryProducts.css';
// import React, { useState, useEffect } from 'react';
// import { useParams,Link } from 'react-router-dom';
// import allProducts from '../Assets/all_products'; // Import the data

// const CategoryProducts = () => {
//      const { name } = useParams();
//      const [products, setProducts] = useState([]);

//      useEffect(() => {
//           const filteredProducts = allProducts.filter(
//                (product) => product.category.toLowerCase().includes(name.toLowerCase())
//           );
//           setProducts(filteredProducts);
//      }, [name]);

//      return (
//           <div>
//                <h2>{name.charAt(0).toUpperCase() + name.slice(1)} Products</h2>
//                <div className="product-list">
//                     {products.map((product) => (
//                          <div key={product.id} className="product-item">
//                               <Link to={`/product/${product.id}`}> {/* Link to product details */}
//                                    <img src={product.image} alt={product.name} />
//                                    <h3>{product.name}</h3>
//                                    <p>
//                                         ${product.new_price.toFixed(2)}{' '}
//                                         {product.old_price && (
//                                              <span style={{ textDecoration: 'line-through', color: 'gray' }}>
//                                                   ${product.old_price.toFixed(2)}
//                                              </span>
//                                         )}
//                                    </p>
//                               </Link>
//                          </div>
//                     ))}
//                </div>
//           </div>
//      );
// };

// export default CategoryProducts;
