import React, { useState } from 'react';
import { Star, Clock, DollarSign, MapPin, Calendar, Filter } from 'lucide-react';
import { LocalExperience } from '../../types';

interface LocalExperiencesProps {
  experiences: LocalExperience[];
  onBookExperience: (experience: LocalExperience) => void;
}

export default function LocalExperiences({ experiences, onBookExperience }: LocalExperiencesProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const experienceTypes = ['all', 'cultural', 'food', 'adventure', 'nature', 'nightlife'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'budget', label: 'Under $50' },
    { value: 'mid', label: '$50 - $100' },
    { value: 'premium', label: '$100+' }
  ];

  const getFilteredExperiences = () => {
    return experiences.filter(exp => {
      const typeMatch = selectedType === 'all' || exp.type === selectedType;
      let priceMatch = true;
      
      if (priceRange === 'budget') priceMatch = exp.cost < 50;
      else if (priceRange === 'mid') priceMatch = exp.cost >= 50 && exp.cost <= 100;
      else if (priceRange === 'premium') priceMatch = exp.cost > 100;
      
      return typeMatch && priceMatch;
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cultural': return 'purple';
      case 'food': return 'orange';
      case 'adventure': return 'red';
      case 'nature': return 'green';
      case 'nightlife': return 'pink';
      default: return 'blue';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Local Experiences</h3>
        <p className="text-gray-600">Discover authentic local activities and cultural experiences</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">Filter by:</span>
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm capitalize"
        >
          {experienceTypes.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Types' : type}
            </option>
          ))}
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
        >
          {priceRanges.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredExperiences().map((experience) => {
          const colorClass = getTypeColor(experience.type);
          
          return (
            <div key={experience.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${colorClass}-100 text-${colorClass}-800 capitalize`}>
                    {experience.type}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                  <span className="text-xs font-medium">{experience.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2">{experience.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{experience.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {experience.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {experience.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Available: {experience.availability.join(', ')}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-xl font-bold text-green-600">${experience.cost}</span>
                    <span className="text-gray-500 text-sm ml-1">per person</span>
                  </div>
                  <button
                    onClick={() => onBookExperience(experience)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {getFilteredExperiences().length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No experiences match your current filters
        </div>
      )}
    </div>
  );
}