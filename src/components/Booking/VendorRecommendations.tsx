import React from 'react';
import { Star, Heart, ExternalLink } from 'lucide-react';
import { Vendor } from '../../types';

interface VendorRecommendationsProps {
  vendors: Vendor[];
  onBooking: (vendor: Vendor) => void;
}

export default function VendorRecommendations({ vendors, onBooking }: VendorRecommendationsProps) {
  const getVendorTypeColor = (type: string) => {
    switch (type) {
      case 'hotel': return 'blue';
      case 'guide': return 'green';
      case 'transport': return 'purple';
      case 'activity': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Recommended Vendors</h3>
        <p className="text-gray-600">Trusted partners with excellent reviews and competitive pricing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => {
          const colorClass = getVendorTypeColor(vendor.type);
          
          return (
            <div key={vendor.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${colorClass}-100 text-${colorClass}-800 capitalize`}>
                    {vendor.type}
                  </span>
                </div>
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2">{vendor.name}</h4>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{vendor.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm ml-2">({vendor.reviews} reviews)</span>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {vendor.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                    {vendor.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{vendor.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      ${vendor.price}
                    </span>
                    <span className="text-gray-500 text-sm">
                      /{vendor.type === 'hotel' ? 'night' : 'person'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 border border-gray-300 rounded-lg hover:border-blue-300">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onBooking(vendor)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}