import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";
import newLogo from "../images/newlogo.svg";
import { FaShoppingCart } from "react-icons/fa";
import DownArrowIcon from "../logo/menu.png";
import { FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { cart } = useCart();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("username");

    if (token) {
      setIsLoggedIn(true);

      fetch(`http://localhost:5000/products${searchTerm}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(storedUserName || data.name);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [cart, searchTerm]);

  return (
    <div>
      <nav className="navbar">
        <div>
          <Link to="/">
            <img className="logo" src={newLogo} alt="Logo" />
          </Link>
          <ul className="links">
            <li>
              <Link to="/login">
                <div className="user">
                  <FaUser className="user-icon" />
                  <div className="user-text">
                    <p className="welcome-text">Welcome</p>
                    <p className="username">{userName}</p>
                    {isLoggedIn ? (
                      <></>
                    ) : (
                      <p className="sign-in-text">Sign In / Register</p>
                    )}
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <div className="cart">
                  <FaShoppingCart className="Cart" />
                  {cart.length > 0 && (
                    <span className="cart-counter">{cart.length}</span>
                  )}
                </div>
              </Link>
            </li>
          </ul>

          <input
            className="search-bar"
            placeholder="Type to Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="search-button1">
            <CiSearch className="search-icon" />
          </button>
        </div>
      </nav>
      <div className="dropdown">
        <div className="dropdown-header" onClick={toggleDropdown}>
          <img
            className={`dropdown-icon ${isDropdownVisible ? "active" : ""}`}
            src={DownArrowIcon}
            alt="Down Arrow"
          />
        </div>
      </div>

      <div className={`overlay ${isDropdownVisible ? "brightness" : ""}`} />

      {isDropdownVisible && (
        <div className="dropdown-content-container">
          <div className="dropdown-content">
            <Link to="/products">Products</Link>
            <Link to="/products?type=Motherboard">Motherboards</Link>
            <Link to="/products?type=Graphic Card">Graphics Cards</Link>
            <Link to="/products?type=cpu">CPU</Link>
            <Link to="/wattage">Wattage Calculator</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
