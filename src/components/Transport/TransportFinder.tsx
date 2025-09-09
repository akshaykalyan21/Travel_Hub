import React, { useState } from 'react';
import { Search, Clock, DollarSign, Leaf, Plane, Train, Bus, Car, MapPin } from 'lucide-react';
import { TransportOption } from '../../types';

interface TransportFinderProps {
  transportOptions: TransportOption[];
  onSelectTransport: (option: TransportOption) => void;
}

export default function TransportFinder({ transportOptions, onSelectTransport }: TransportFinderProps) {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'fastest' | 'cheapest' | 'eco-friendly'>('all');

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'flight': return <Plane className="h-5 w-5" />;
      case 'train': return <Train className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'rental-car': return <Car className="h-5 w-5" />;
      default: return <Car className="h-5 w-5" />;
    }
  };

  const getFilteredOptions = () => {
    let filtered = [...transportOptions];
    
    switch (filterBy) {
      case 'fastest':
        filtered.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
        break;
      case 'cheapest':
        filtered.sort((a, b) => a.cost - b.cost);
        break;
      case 'eco-friendly':
        filtered.sort((a, b) => b.ecoScore - a.ecoScore);
        break;
    }
    
    return filtered;
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'flight': return 'blue';
      case 'train': return 'green';
      case 'bus': return 'orange';
      case 'rental-car': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Find Transport Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="Departure city"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                placeholder="Destination city"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Options</option>
              <option value="fastest">Fastest</option>
              <option value="cheapest">Cheapest</option>
              <option value="eco-friendly">Most Eco-Friendly</option>
            </select>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all">
          <Search className="inline h-5 w-5 mr-2" />
          Search Transport Options
        </button>
      </div>

      {/* Transport Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Available Options</h3>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
              <Leaf className="h-3 w-3 mr-1" />
              Eco Score
            </span>
          </div>
        </div>

        {getFilteredOptions().map((option) => {
          const colorClass = getModeColor(option.mode);
          
          return (
            <div key={option.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 bg-${colorClass}-100 rounded-lg`}>
                    {getTransportIcon(option.mode)}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg capitalize">{option.mode.replace('-', ' ')}</h4>
                    <p className="text-gray-600">{option.provider}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">${option.cost}</div>
                  <div className="text-sm text-gray-500">per person</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium">Duration</div>
                    <div className="text-sm text-gray-600">{option.duration}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium">Departure</div>
                    <div className="text-sm text-gray-600">{option.departure}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium">Arrival</div>
                    <div className="text-sm text-gray-600">{option.arrival}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Leaf className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-sm font-medium">Eco Score</div>
                    <div className="text-sm text-green-600">{option.ecoScore}/10</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {option.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => onSelectTransport(option)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Select This Option
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}