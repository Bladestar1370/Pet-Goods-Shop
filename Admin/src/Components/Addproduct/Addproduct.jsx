import React, { useState } from "react";
import "./Addproduct.css";
import upload_area from "../../assets/upload_area.svg";

const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Dog",
    productType: "Food",
    new_price: "",
    old_price: "",
    description: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_product = async () => {
    console.log('Product Details:', productDetails); // Debug
    let responseData;
    let product = { ...productDetails };

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log('Product to send:', product); // Debug
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            alert("Product Added");
            // Reload page to refresh all_products
            window.location.reload();
            // Reset form
            setProductDetails({
              name: "",
              image: "",
              category: "Dog",
              productType: "Food",
              new_price: "",
              old_price: "",
              description: "",
            });
            setImage(false);
          } else {
            alert("Failed to add product");
          }
        });
    } else {
      alert("Failed to upload image");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Fish">Fish</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Type</p>
        <select
          value={productDetails.productType}
          onChange={changeHandler}
          name="productType"
          className="add-product-selector"
        >
          <option value="Food">Food</option>
          <option value="Toy">Toy</option>
          <option value="Medicine">Medicine</option>
          <option value="Accessory">Accessory</option>
          <option value="Grooming">Grooming</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <textarea
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Enter product description"
          rows="5"
          style={{ width: "100%", resize: "vertical" }}
        />
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="add-product-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={Add_product} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default Addproduct;