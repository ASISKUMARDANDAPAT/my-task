import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { events, categories } from '../data/events';

const ITEMS_PER_PAGE = 6;

function EventList() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-10 bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">Discover Exciting Events</h1>
        <p className="text-lg text-blue-100 mt-2">Find events that match your interests</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="text"
          placeholder="🔍 Search events..."
          className="p-3 border border-transparent rounded-lg shadow-sm focus:ring focus:ring-blue-400 transition duration-200 w-full md:w-1/3 bg-white text-gray-700 placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-transparent rounded-lg shadow-sm focus:ring focus:ring-blue-400 transition duration-200 w-full md:w-1/4 bg-white text-gray-700"
        >
          <option value="All">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-lg font-semibold text-blue-200">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedEvents.map(event => (
            <Link
              key={event.id}
              to={`/event/${event.id}`}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 overflow-hidden"
            >
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-5 space-y-3">
                <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
                <p className="text-gray-500 text-sm truncate">{event.description}</p>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="text-blue-600 font-bold">${event.price}</span>
                  <span className="text-sm">{event.availableSeats} seats left</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center gap-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EventList;
