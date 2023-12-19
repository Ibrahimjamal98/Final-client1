// Admin.jsx

import React, { useState } from "react";
import AddProductForm from "../components/AddProductForm";
import "../style/admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);

  const handleProductAdded = (addedProduct) => {
    setProducts([...products, addedProduct]);
  };

  return (
    <div>
      <AddProductForm onProductAdded={handleProductAdded} />
    </div>
  );
};

export default Admin;
