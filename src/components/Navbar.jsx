import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import image from "../data/logo.png";
import { IoCartSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function Navbar() {
  const { user, logout, cartCount, cartItems, removeFromCart } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src={image} alt="Logo" className="h-10" />
          <span className="text-white text-2xl font-bold">Book-Event</span>
        </Link>
        
        <div className="flex items-center gap-6">
          {/* Cart Section */}
          <div className="relative">
            <button onClick={toggleCart} className="flex flex-col items-center gap-1 text-white text-lg">
              <span className="text-xl font-semibold">{cartCount}</span>
              <IoCartSharp className="text-2xl hover:text-yellow-400 transition duration-300" />
            </button>
            
            {/* Cart Modal */}
            {isCartOpen && (
              <div className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-lg shadow-lg w-72 max-h-96 overflow-y-auto z-10">
                <div className="p-4 flex justify-between items-center border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-700">Your Cart</h2>
                  <button onClick={toggleCart} className="text-gray-600 hover:text-gray-800">
                    <MdClose size={24} />
                  </button>
                </div>
                {cartItems.length > 0 ? (
                  cartItems.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border-b border-gray-200">
                      <div>
                        <h3 className="text-gray-800 font-semibold">{event.title}</h3>
                        <p className="text-gray-500 text-sm">${event.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(event.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-gray-600 text-center">No items in cart</p>
                )}
              </div>
            )}
          </div>

          {/* User Authentication Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <FaUserCircle className="text-white text-2xl" />
              <span className="text-white text-lg">Welcome, {user.username}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:scale-105 transform transition duration-300 ease-in-out shadow-lg hover:from-pink-600 hover:to-orange-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
