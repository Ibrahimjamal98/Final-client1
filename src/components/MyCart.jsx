import React from "react";
import { useCart } from "../context/CartContext";
import "../style/cart.css";

const MyCart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleIncreaseQuantity = (productId) => {
    updateQuantity(productId, 1);
  };

  const handleDecreaseQuantity = (productId) => {
    updateQuantity(productId, -1);
  };

  const calculateTotalPrice = (product) => {
    return product.productPrice * product.quantity;
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <p className="Cart-text">Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <tbody>
            {cart.map((product) => (
              <tr key={product._id} className="cart-item">
                <td>
                  {product.productImage && (
                    <img
                      src={product.productImage}
                      alt={product.title}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </td>
                <td className="title">{product.title}</td>
                <td className="price">₪{product.productPrice}</td>
                <td>
                  <button
                    className="quantity-decrease"
                    onClick={() => handleDecreaseQuantity(product._id)}
                  >
                    -
                  </button>
                  {product.quantity}
                  <button
                    className="quantity-increase"
                    onClick={() => handleIncreaseQuantity(product._id)}
                  >
                    +
                  </button>
                </td>
                <td className="total">₪{calculateTotalPrice(product)}</td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(product._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyCart;
