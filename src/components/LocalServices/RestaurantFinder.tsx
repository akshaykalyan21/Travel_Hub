import React, { useState } from 'react';
import { Star, MapPin, Clock, DollarSign, Utensils, Phone } from 'lucide-react';
import { Restaurant } from '../../types';

interface RestaurantFinderProps {
  restaurants: Restaurant[];
  onBookTable: (restaurant: Restaurant) => void;
}

export default function RestaurantFinder({ restaurants, onBookTable }: RestaurantFinderProps) {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');

  const cuisines = ['all', ...Array.from(new Set(restaurants.map(r => r.cuisine)))];
  const priceRanges = ['all', '$', '$$', '$$$', '$$$$'];

  const getFilteredRestaurants = () => {
    return restaurants.filter(restaurant => {
      const cuisineMatch = selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine;
      const priceMatch = selectedPriceRange === 'all' || restaurant.priceRange === selectedPriceRange;
      return cuisineMatch && priceMatch;
    });
  };

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case '$': return 'green';
      case '$$': return 'blue';
      case '$$$': return 'orange';
      case '$$$$': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Restaurant Finder</h3>
        <p className="text-gray-600">Discover the best dining experiences in your destination</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Utensils className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">Filter by:</span>
        </div>

        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
        >
          {cuisines.map(cuisine => (
            <option key={cuisine} value={cuisine}>
              {cuisine === 'all' ? 'All Cuisines' : cuisine}
            </option>
          ))}
        </select>

        <select
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
        >
          {priceRanges.map(range => (
            <option key={range} value={range}>
              {range === 'all' ? 'All Price Ranges' : range}
            </option>
          ))}
        </select>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredRestaurants().map((restaurant) => {
          const priceColor = getPriceRangeColor(restaurant.priceRange);
          
          return (
            <div key={restaurant.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${priceColor}-100 text-${priceColor}-800`}>
                    {restaurant.priceRange}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                  <span className="text-xs font-medium">{restaurant.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-lg mb-1">{restaurant.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine} Cuisine</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {restaurant.distance} away
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Peak: {restaurant.peakHours}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {restaurant.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {restaurant.bookingAvailable ? (
                    <button
                      onClick={() => onBookTable(restaurant)}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      Book Table
                    </button>
                  ) : (
                    <button className="flex-1 bg-gray-300 text-gray-600 py-2 px-3 rounded-lg cursor-not-allowed text-sm">
                      Walk-in Only
                    </button>
                  )}
                  <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {getFilteredRestaurants().length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No restaurants match your current filters
        </div>
      )}
    </div>
  );
}