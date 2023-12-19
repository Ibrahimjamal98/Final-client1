import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";

import SharedLayout from "./components/SharedLayout";

import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import UserDashboard from "./components/UserDashboard";
import Admin from "./pages/Admin";
import WattageCal from "./pages/WattageCal";

function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <SharedLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <UserDashboard />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/wattage",
          element: <WattageCal />,
        },
      ],
    },
  ]);

  return (
    <>
      <CartProvider>
        <RouterProvider router={Router} />
      </CartProvider>
    </>
  );
}

export default App;
