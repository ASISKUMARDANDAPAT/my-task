import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { events } from "../data/events";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCart } = useAuth();
  const [booking, setBooking] = useState(false);

  // Find the event from the list of events based on the 'id' parameter
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return <div className="text-center text-xl text-red-500">Event not found</div>;
  }

  // Handle booking process
  const handleBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setBooking(true);
    setTimeout(() => {
      event.availableSeats -= 1;
      addToCart(event); // Add the specific event to the cart
      setBooking(false);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 min-h-[70vh] flex items-center justify-center py-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 mb-8">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-44 object-cover rounded-t-xl"
        />
        <div className="p-5 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{event.title}</h1>
          <p className="text-gray-600">{event.description}</p>

          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700 text-sm">
            <div className="flex flex-col">
              <span className="font-semibold text-indigo-600">Date</span>
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-indigo-600">Category</span>
              <span>{event.category}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-indigo-600">Price</span>
              <span className="text-lg font-semibold">${event.price}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-indigo-600">Available Seats</span>
              <span>{event.availableSeats}</span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={event.availableSeats === 0 || booking}
            className={`w-full py-3 px-6 mt-4 rounded-lg font-semibold text-white transition duration-300 ${
              event.availableSeats === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            }`}
          >
            {booking
              ? "Booking..."
              : event.availableSeats === 0
              ? "Sold Out"
              : "Book Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
