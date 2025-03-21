// Popular.jsx
import React from "react";
import "./Popular.css";
import data_product from "../Assets/data";
import { Link } from "react-router-dom"; // Import Link for navigation
import Item from "../Item/Item"; // Adjust the path as needed

export const Popular = () => {
  return (
    <div className="popular">
      <h1>Popular Products</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((product) => (
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

// import React from 'react'
// import './Popular.css'
// import data_product from '../Assets/data'
// import Item from '../Item/Item'
// export const Popular = () => {
//   return (
//     <div className='popular'>
//         <h1>Popular Products</h1>
//         <hr />
//         <div className="popular-item">
//             {data_product.map((item,i)=>{
//                 return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//             })}
//         </div>
//     </div>
//   )
// }
