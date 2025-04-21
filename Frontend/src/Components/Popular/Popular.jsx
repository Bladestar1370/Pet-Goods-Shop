// Popular.jsx
import React, { useEffect, useState } from "react";
import "./Popular.css";
import { Link } from "react-router-dom";
import Item from "../Item/Item";
import { apiFetch } from "../../utils/apiFetch";

export const Popular = () => {
  const [popular, setpopular] = useState([]);

  useEffect(() => {
    apiFetch('http://localhost:4000/popular')
      .then((data) => setpopular(data))
      .catch((error) => console.error('Error fetching popular products:', error));
  }, []);

  return (
    <div className="popular">
      <h1>Popular Products</h1>
      <hr />
      <div className="popular-item">
        {popular.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
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

export default Popular;