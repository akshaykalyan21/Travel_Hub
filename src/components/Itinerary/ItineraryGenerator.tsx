import React from 'react';
import { Clock, MapPin, DollarSign } from 'lucide-react';
import { ItineraryDay } from '../../types';

interface ItineraryGeneratorProps {
  itinerary: ItineraryDay[];
  destination: string;
}

export default function ItineraryGenerator({ itinerary, destination }: ItineraryGeneratorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Your {destination} Itinerary</h3>
        <p className="text-gray-600">AI-generated day-by-day plan tailored to your preferences</p>
      </div>

      <div className="space-y-6">
        {itinerary.map((day) => (
          <div key={day.day} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold">Day {day.day}</h4>
              <span className="text-sm text-gray-500">{day.date}</span>
            </div>

            <div className="space-y-4">
              {day.activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">{activity.activity}</h5>
                      <span className="text-sm font-medium text-blue-600">{activity.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {activity.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {activity.duration}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        ${activity.cost}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Day Total:</span>
                <span className="font-semibold">
                  ${day.activities.reduce((sum, activity) => sum + activity.cost, 0)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-blue-900">Total Trip Cost:</span>
          <span className="text-xl font-bold text-blue-600">
            ${itinerary.reduce((total, day) => 
              total + day.activities.reduce((dayTotal, activity) => dayTotal + activity.cost, 0), 0
            )}
          </span>
        </div>
      </div>
    </div>
  );
}