import React from 'react';
import { Plane, Hotel, Utensils, Camera, Car } from 'lucide-react';
import { TripCost } from '../../types';

interface CostEstimatorProps {
  costs: TripCost;
  budget: string;
}

export default function CostEstimator({ costs, budget }: CostEstimatorProps) {
  const costCategories = [
    { key: 'flights', label: 'Flights', icon: Plane, color: 'blue' },
    { key: 'accommodation', label: 'Hotels', icon: Hotel, color: 'green' },
    { key: 'food', label: 'Food & Dining', icon: Utensils, color: 'orange' },
    { key: 'activities', label: 'Activities', icon: Camera, color: 'purple' },
    { key: 'transport', label: 'Local Transport', icon: Car, color: 'teal' }
  ];

  const getBudgetLevel = (budget: string) => {
    switch (budget) {
      case 'budget': return { label: 'Budget Trip', color: 'green', savings: '30% less than average' };
      case 'luxury': return { label: 'Luxury Experience', color: 'purple', savings: '50% more premium' };
      default: return { label: 'Mid-Range Comfort', color: 'blue', savings: 'Best value for money' };
    }
  };

  const budgetInfo = getBudgetLevel(budget);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Trip Cost Estimate</h3>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${budgetInfo.color}-100 text-${budgetInfo.color}-800`}>
          {budgetInfo.label} • {budgetInfo.savings}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {costCategories.map(({ key, label, icon: Icon, color }) => {
          const amount = costs[key as keyof TripCost] as number;
          const percentage = (amount / costs.total) * 100;
          
          return (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 bg-${color}-100 rounded-lg`}>
                  <Icon className={`h-5 w-5 text-${color}-600`} />
                </div>
                <span className="font-medium">{label}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">${amount.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{percentage.toFixed(0)}%</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total Estimated Cost</span>
          <span className="text-2xl font-bold text-blue-600">${costs.total.toLocaleString()}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          *Prices are estimates and may vary based on availability and season
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-green-800">Budget Option</div>
          <div className="text-lg font-bold text-green-600">
            ${Math.round(costs.total * 0.7).toLocaleString()}
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-blue-800">Mid-Range</div>
          <div className="text-lg font-bold text-blue-600">
            ${costs.total.toLocaleString()}
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-purple-800">Luxury</div>
          <div className="text-lg font-bold text-purple-600">
            ${Math.round(costs.total * 1.5).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}