import React, { useState } from 'react';
import { Search, Calendar, Users, DollarSign } from 'lucide-react';
import { TripData } from '../../types';

interface TripPlannerFormProps {
  onTripPlan: (tripData: TripData) => void;
}

export default function TripPlannerForm({ onTripPlan }: TripPlannerFormProps) {
  const [formData, setFormData] = useState<TripData>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    tripType: 'leisure',
    budget: 'mid-range',
    preferences: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTripPlan(formData);
  };

  const tripTypes = [
    { value: 'leisure', label: 'Leisure' },
    { value: 'business', label: 'Business' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'family', label: 'Family' },
    { value: 'romantic', label: 'Romantic' }
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Budget', description: 'Under $100/day' },
    { value: 'mid-range', label: 'Mid-range', description: '$100-250/day' },
    { value: 'luxury', label: 'Luxury', description: '$250+/day' }
  ];

  const preferences = [
    'Cultural Sites', 'Nature & Wildlife', 'Food & Dining', 'Nightlife',
    'Shopping', 'Adventure Sports', 'Relaxation', 'Photography'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Perfect Trip</h2>
        <p className="text-gray-600">Tell us about your dream destination and we'll create a personalized itinerary</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Search className="inline h-4 w-4 mr-2" />
            Where would you like to go?
          </label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            placeholder="Enter city, country, or region"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-2" />
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Travelers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="inline h-4 w-4 mr-2" />
            Number of Travelers
          </label>
          <select
            value={formData.travelers}
            onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
            ))}
          </select>
        </div>

        {/* Trip Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Trip Type</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {tripTypes.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFormData({ ...formData, tripType: value })}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  formData.tripType === value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <DollarSign className="inline h-4 w-4 mr-2" />
            Budget Range
          </label>
          <div className="space-y-3">
            {budgetOptions.map(({ value, label, description }) => (
              <label key={value} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="budget"
                  value={value}
                  checked={formData.budget === value}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <div className="font-medium">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Interests & Preferences</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {preferences.map((pref) => (
              <label key={pref} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={formData.preferences.includes(pref)}
                  onChange={(e) => {
                    const newPrefs = e.target.checked
                      ? [...formData.preferences, pref]
                      : formData.preferences.filter(p => p !== pref);
                    setFormData({ ...formData, preferences: newPrefs });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                <span className="ml-2">{pref}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all transform hover:scale-[1.02] shadow-lg"
        >
          Generate My Trip Plan
        </button>
      </form>
    </div>
  );
}