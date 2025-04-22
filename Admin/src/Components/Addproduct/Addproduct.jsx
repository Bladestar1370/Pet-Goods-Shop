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
      <h2>Add New Product</h2>
      <div className="addproduct-itemfield">
        <label>Product Title</label>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Enter product name"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <label>Original Price</label>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            name="old_price"
            placeholder="Enter original price"
          />
        </div>
        <div className="addproduct-itemfield">
          <label>Offer Price</label>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            name="new_price"
            placeholder="Enter offer price"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <label>Product Category</label>
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
          <option value="Rabbit">Rabbit</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label>Product Type</label>
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
        <label>Product Description</label>
        <textarea
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Enter product description"
          rows="5"
        />
      </div>
      <div className="addproduct-itemfield">
        <label>Product Image</label>
        <div className="addproduct-image-upload">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              className="add-product-thumbnail-img"
              alt="Upload preview"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            accept="image/*"
            hidden
          />
        </div>
      </div>
      <button onClick={Add_product} className="addproduct-btn">
        Add Product
      </button>
    </div>
  );
};

export default Addproduct;