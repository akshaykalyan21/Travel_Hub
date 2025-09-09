import React from 'react';
import { Shield, Check, AlertTriangle, Heart, Mountain, Plane } from 'lucide-react';
import { TravelInsurance } from '../../types';

interface InsuranceRecommendationsProps {
  insuranceOptions: TravelInsurance[];
  onSelectInsurance: (insurance: TravelInsurance) => void;
}

export default function InsuranceRecommendations({ insuranceOptions, onSelectInsurance }: InsuranceRecommendationsProps) {
  const getInsuranceIcon = (type: string) => {
    switch (type) {
      case 'basic': return <Shield className="h-6 w-6" />;
      case 'adventure': return <Mountain className="h-6 w-6" />;
      case 'comprehensive': return <Heart className="h-6 w-6" />;
      default: return <Shield className="h-6 w-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'basic': return 'blue';
      case 'adventure': return 'orange';
      case 'comprehensive': return 'purple';
      default: return 'gray';
    }
  };

  const getRecommendedBadge = (type: string) => {
    if (type === 'comprehensive') {
      return (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Recommended
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Travel Insurance</h3>
        <p className="text-gray-600">Protect your trip with comprehensive travel insurance coverage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insuranceOptions.map((insurance) => {
          const colorClass = getTypeColor(insurance.type);
          
          return (
            <div key={insurance.id} className="relative border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
              {getRecommendedBadge(insurance.type)}
              
              <div className="text-center mb-6">
                <div className={`inline-flex p-3 bg-${colorClass}-100 rounded-full mb-4`}>
                  {getInsuranceIcon(insurance.type)}
                </div>
                <h4 className="text-xl font-semibold mb-2 capitalize">{insurance.type}</h4>
                <p className="text-gray-600 font-medium">{insurance.provider}</p>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-1">${insurance.cost}</div>
                <div className="text-sm text-gray-500">for {insurance.duration}</div>
              </div>

              <div className="space-y-3 mb-6">
                <h5 className="font-semibold text-gray-900">Coverage Includes:</h5>
                {insurance.coverage.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <h5 className="font-semibold text-gray-900">Features:</h5>
                {insurance.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSelectInsurance(insurance)}
                className={`w-full bg-${colorClass}-600 text-white py-3 px-4 rounded-lg hover:bg-${colorClass}-700 transition-colors font-semibold`}
              >
                Select Plan
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900 mb-1">Important Note</h4>
            <p className="text-yellow-800 text-sm">
              Travel insurance should be purchased as soon as you book your trip for maximum coverage. 
              Review policy details carefully and ensure coverage matches your travel activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}