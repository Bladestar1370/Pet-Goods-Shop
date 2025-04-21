import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
import { apiFetch } from "../../utils/apiFetch";

export const RelatedProducts = ({ category, productType }) => {
  const [related, setrelated] = useState([]);

  useEffect(() => {
    if (category && productType) {
      console.log('Fetching related products with:', { category, productType });
      apiFetch('http://localhost:4000/relatedproducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, productType }),
      })
        .then((data) => {
          console.log('Related products:', data);
          setrelated(data);
        })
        .catch((error) => console.error('Error fetching related products:', error));
    } else {
      console.warn('Missing category or productType:', { category, productType });
    }
  }, [category, productType]);

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.length === 0 ? (
          <p>No related products found.</p>
        ) : (
          related.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              category={product.category}
              new_price={product.new_price}
              old_price={product.old_price}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;