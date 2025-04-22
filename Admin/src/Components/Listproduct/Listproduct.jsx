import React, { useEffect, useState } from "react";
import "./Listproduct.css";
import cross_icon from "../../assets/cross_icon.png";

const Listproduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/allproducts");
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setAllProducts(data.data);
        setError(null);
      } else {
        throw new Error(data.error || "Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      if (data.success) {
        await fetchInfo();
        alert("Product Removed Successfully!");
      } else {
        console.error("Error removing product:", data.error);
        alert("Failed to remove product");
      }
    } catch (err) {
      console.error("Error removing product:", err);
      alert("Error removing product");
    }
  };

  return (
    <div className="list-product">
      <h2>All Products</h2>
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Loading products...</p>}
      <div className="listproduct-table">
        <div className="listproduct-format-main">
          <span>Image</span>
          <span>Title</span>
          <span>Old Price</span>
          <span>New Price</span>
          <span>Category</span>
          <span>Type</span>
          <span>Remove</span>
        </div>
        <div className="listproduct-allproducts">
          {allproducts.length === 0 && !error && !loading && <p className="no-products">No products available.</p>}
          {allproducts.map((product) => (
            <div key={product.id} className="listproduct-format">
              <img src={product.image} alt={product.name} className="listproduct-product-icon" />
              <span>{product.name}</span>
              <span>${product.old_price.toFixed(2)}</span>
              <span>${product.new_price.toFixed(2)}</span>
              <span>{product.category}</span>
              <span>{product.productType || "N/A"}</span>
              <img
                onClick={() => remove_product(product.id)}
                className="listproduct-remove-icon"
                src={cross_icon}
                alt="Remove"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listproduct;