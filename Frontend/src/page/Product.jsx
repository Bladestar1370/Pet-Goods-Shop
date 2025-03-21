import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../Components/CartContext/ShopContext.jsx";
import { Breadcrum } from "../Components/Breadcrums/Breadcrum.jsx";
import { ProductDisplay } from "../Components/ProductDisplay/ProductDisplay.jsx";
import { DescriptionBox } from "../Components/DescriptionBox/DescriptionBox.jsx";
import { RelatedProducts } from "../Components/RelatedProducts/RelatedProducts.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const { all_products } = useContext(ShopContext);
  const product = all_products.find((p) => p.id === Number(id)); // Ensure it's a number

  if (!product) {
    return (
      <div>
        Product not found. <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  );
};

export default ProductDetails;

// import React, { useContext } from "react";
// import { useParams, Link } from "react-router-dom";
// import { ShopContext } from "../../Components/CartContext/ShopContext.jsx";
// import "./ProductDetails.css";
// import { Breadcrum } from "../../Components/Breadcrums/Breadcrum.jsx";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { all_products, addItemToCart, addItemToWishlist, cart, wishlist } = useContext(ShopContext);
//   const product = all_products.find((p) => p.id === Number(id)); // Ensure it's a number

//   if (!product) {
//     return (
//       <div className="not-found">
//         Product not found. <Link to="/">Go back to Home</Link>
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     const itemInCart = cart.find((item) => item.id === product.id);
//     if (!itemInCart) {
//       addItemToCart(product);
//     }
//   };

//   const handleAddToWishlist = () => {
//     const itemInWishlist = wishlist.find((item) => item.id === product.id);
//     if (!itemInWishlist) {
//       addItemToWishlist(product);
//     }
//   };

//   return (
//     <div className="product-details">
//       <Breadcrum product={product} />
//       <div className="product-image">
//         <img src={product.image} alt={product.name} />
//       </div>
//       <div className="product-info">
//         <h2>{product.name}</h2>
//         <p className="category">Category: {product.category}</p>
//         <div className="prices">
//           <span className="new-price">${product.new_price.toFixed(2)}</span>
//           {product.old_price && (
//             <span className="old-price">${product.old_price.toFixed(2)}</span>
//           )}
//         </div>
//         <p className="description">
//           {product.description || "A high-quality product for your pets."}
//         </p>
//         <div className="product-actions">
//           <button className="add-to-cart-btn" onClick={handleAddToCart}>
//             Add to Cart
//           </button>
//           <button className="add-to-wishlist-btn" onClick={handleAddToWishlist}>
//             <i className="fa-regular fa-heart"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
