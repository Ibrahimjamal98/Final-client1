import Modal from "react-modal";

import { useState, useEffect } from "react";
import "../style/Form.css";
import axios from "axios";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    width: "60%",
    height: "60%",
    margin: "auto",
    top: "50%",
    transform: "translateY(-50%)",
  },
};

const EditForm = ({ product, onClose, onProductUpdated }) => {
  const baseURL = "http://localhost:5000/products";
  const [isModelOpen, setIsModelOpen] = useState(true);
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    productImage: "",
    description: "",
    productPrice: "",
  });

  useEffect(() => {
    setEditedProduct({
      title: product.title,
      productImage: product.productImage,
      description: product.description,
      productPrice: product.productPrice,
    });
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const updateProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseURL}/${product._id}`,
        editedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Product updated successfully:", response.data);
      setIsModelOpen(false);
      onProductUpdated(response.data.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="overlay">
      <Modal
        style={customStyles}
        isOpen={isModelOpen}
        onRequestClose={onClose}
        appElement={document.getElementById("root")}
      >
        <h1>Update Form</h1>
        <Link to="/products">
          <img
            className="imgclose"
            src={closeImage}
            onClick={onClose}
            alt="Close"
          />
        </Link>

        <div>
          <label className="label">Product Name:</label>
          <input
            className="form-input"
            name="title"
            value={editedProduct.title}
            placeholder="Product name"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Product Image URL:</label>
          <input
            className="form-input"
            name="productImage"
            placeholder="Product image"
            value={editedProduct.productImage}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            className="form-input"
            name="productPrice"
            placeholder="Product Price"
            value={editedProduct.productPrice}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            className="form-input"
            name="description"
            value={editedProduct.description}
            placeholder="Description of product"
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" onClick={updateProduct}>
          Update Product
        </button>
      </Modal>
    </div>
  );
};

export default EditForm;
