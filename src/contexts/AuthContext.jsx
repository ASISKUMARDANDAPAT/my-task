import React, { createContext, useContext, useState } from "react";

// Create a context for both Auth and Cart
const AuthContext = createContext(null);

// Custom hook for accessing Auth and Cart state
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Authentication state
  const [user, setUser] = useState(null);

  // Cart state with items and count
  const [cartItems, setCartItems] = useState([]);

  // Authentication functions
  const login = (username, password) => {
    // Mock authentication (can be replaced with real API)
    if (username === "asis123" && password === "Asis@123") {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCartItems([]); // Optionally clear cart on logout
  };

  // Cart functions
  const addToCart = (event) => {
    setCartItems((prevItems) => [...prevItems, event]);
  };

  const removeFromCart = (eventId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== eventId));
  };

  const cartCount = cartItems.length; // Count the number of items in the cart

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
