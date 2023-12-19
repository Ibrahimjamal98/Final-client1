import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MyCart from "../components/MyCart";
import { useCart } from "../context/CartContext";
import "../style/Products.css";
import EditForm from "../components/EditForm";

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [userRole, setUserRole] = useState("");
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [currentProductBeingEdited, setCurrentProductBeingEdited] =
    useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    productType: "",
    productPrice: 0,
    productImage: "",
  });
  const location = useLocation();

  const baseURL = "http://localhost:5000/products";

  useEffect(() => {
    const getUserRoleFromLocalStorage = () => {
      const role = localStorage.getItem("role");
      if (role) {
        setUserRole(role);
      }
    };

    getUserRoleFromLocalStorage();

    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL);
        setProducts(response.data.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const searchParams = new URLSearchParams(location.search);
    const typeParam = searchParams.get("type");
    setSelectedProductType(typeParam || "");
  }, [location.search]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  const handleEditClick = (product) => {
    setCurrentProductBeingEdited(product);
    setEditProductModalOpen(true);
  };
  const handleProductUpdated = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setEditProductModalOpen(false);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedProductType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(baseURL, newProduct, {
        withCredentials: true,
      });

      const addedProduct = response.data.data;

      setNewProduct({
        title: "",
        productType: "",
        productPrice: 0,
        productImage: "",
        description: "",
        productBrand: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const filteredProducts = selectedProductType
    ? products.filter((product) => product.productType === selectedProductType)
    : products;

  const sortedProducts = [...filteredProducts];

  if (sortOption === "priceHighToLow") {
    sortedProducts.sort((a, b) => b.productPrice - a.productPrice);
  } else if (sortOption === "priceLowToHigh") {
    sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseURL}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = async (productId, updatedProductData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseURL}/${productId}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setProducts(
        products.map((product) =>
          product._id === productId
            ? { ...product, ...response.data.data }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container">
      <div className="filters ">
        <div className="filter-container">
          <label htmlFor="type">Filter by Type:</label>
          <select
            id="sort"
            value={selectedProductType}
            onChange={handleTypeChange}
          >
            <option value="">All</option>
            <option value="Motherboard">Motherboard</option>
            <option value="Graphic Card">Graphics Card</option>
            <option value="Mouse">Mouses</option>
            <option value="Keyboard">Keyboards</option>
            <option value="cpu">CPU</option>
          </select>
        </div>
        <div className="sort-container">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="">-- Select --</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="priceLowToHigh">Price: Low to High</option>
          </select>
        </div>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <div className="products-container">
          {sortedProducts.map((product) => (
            <div key={product._id} className="product-item">
              {product.productImage && (
                <img
                  src={product.productImage}
                  alt={product.title}
                  className="product-image"
                />
              )}
              <p className="product-title">{product.title}</p>
              <p className="product-price"> {product.productPrice} ₪</p>
              {userRole === "admin" ? (
                <div className="crud-options">
                  <button
                    className="button"
                    style={{
                      backgroundColor: "#00ff00",
                      color: "white",
                      padding: "10px 15px",
                      margin: "5px",
                    }}
                    onClick={() => handleEditClick(product)}
                  >
                    Update
                  </button>
                  {editProductModalOpen && currentProductBeingEdited && (
                    <EditForm
                      product={currentProductBeingEdited}
                      onClose={() => setEditProductModalOpen(false)}
                      onProductUpdated={handleProductUpdated}
                    />
                  )}
                  <button
                    className="button"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  className="button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
