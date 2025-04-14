import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";

export const RelatedProducts = () => {

  const [related,setrelated] = useState([]);

  useEffect(()=>{
      fetch('http://localhost:4000/popular')
      .then((response)=>response.json())
      .then((data)=>setrelated(data));
    },[])

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map((product, id) => {
          return (
            <Item
              key={product.id} // Add a unique key for each item
              id={product.id}
              name={product.name}
              image={product.image}
              category={product.category}
              new_price={product.new_price}
              old_price={product.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;