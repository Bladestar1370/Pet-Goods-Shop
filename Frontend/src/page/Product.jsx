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
      <DescriptionBox description={product.description} />
      <RelatedProducts category={product.category} productType={product.productType} />
    </div>
  );
};

export default ProductDetails;