import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import "./CategoryProducts.css";
import Item from "../Item/Item";
import { ShopContext } from "../CartContext/ShopContext";

const CategoryProducts = () => {
  const { name } = useParams();
  const location = useLocation();
  const { all_products: allProducts } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const isProductType = location.pathname.includes("/product-type/");

  useEffect(() => {
    if (allProducts) {
      const filteredProducts = allProducts.filter((product) =>
        isProductType
          ? product.productType?.toLowerCase().includes(name.toLowerCase())
          : product.category?.toLowerCase().includes(name.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [name, allProducts, isProductType]);

  return (
    <div className="category-products">
      <h2>
        {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
        {isProductType ? "Products" : "Pet Products"}
      </h2>
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
