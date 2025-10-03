import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Store from "./Store";
import Cart from "./Cart";
import { useEffect, useState } from "react";

function App() {
const [cartItems, setCartItems] = useState(() => {
  try {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      if (Array.isArray(parsedItems)) {
        return parsedItems;
      }
    }
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
  }
  return [];
});

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Store setCartItems={setCartItems} cartItems={cartItems} />}
        />
        <Route
          path="/Cart"
          element={<Cart setCartItems={setCartItems} cartItems={cartItems} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
