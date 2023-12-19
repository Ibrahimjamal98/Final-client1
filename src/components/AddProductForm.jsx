import React, { useState } from "react";
import axios from "axios";

const AddProductForm = ({ onProductAdded, onClose }) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    productType: "",
    productPrice: 0,
    productImage: "",
    description: "",
    productBrand: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        newProduct,
        config
      );

      setNewProduct({
        title: "",
        productType: "",
        productPrice: 0,
        productImage: "",
        description: "",
        productBrand: "",
      });

      onProductAdded(response.data.data);
      onClose();
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newProduct.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="productType">Product Type:</label>
        <input
          type="text"
          id="productType"
          name="productType"
          value={newProduct.productType}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="productPrice">Product Price:</label>
        <input
          type="number"
          id="productPrice"
          name="productPrice"
          value={newProduct.productPrice}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="productImage">Product Image URL:</label>
        <input
          type="url"
          id="productImage"
          name="productImage"
          value={newProduct.productImage}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="productBrand">Product Brand:</label>
        <input
          type="text"
          id="productBrand"
          name="productBrand"
          value={newProduct.productBrand}
          onChange={handleInputChange}
        />

        <button type="submit">Add Product</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
