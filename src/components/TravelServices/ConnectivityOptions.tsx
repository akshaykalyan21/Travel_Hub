import React from 'react';
import { Wifi, Smartphone, Globe, Signal } from 'lucide-react';
import { ConnectivityOption } from '../../types';

interface ConnectivityOptionsProps {
  connectivityOptions: ConnectivityOption[];
  onSelectOption: (option: ConnectivityOption) => void;
}

export default function ConnectivityOptions({ connectivityOptions, onSelectOption }: ConnectivityOptionsProps) {
  const getConnectivityIcon = (type: string) => {
    switch (type) {
      case 'sim-card': return <Smartphone className="h-6 w-6" />;
      case 'esim': return <Globe className="h-6 w-6" />;
      case 'wifi-hotspot': return <Wifi className="h-6 w-6" />;
      case 'roaming': return <Signal className="h-6 w-6" />;
      default: return <Smartphone className="h-6 w-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sim-card': return 'blue';
      case 'esim': return 'purple';
      case 'wifi-hotspot': return 'green';
      case 'roaming': return 'orange';
      default: return 'gray';
    }
  };

  const formatType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
        <p className="text-gray-600">Choose the best connectivity option for your travel needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectivityOptions.map((option) => {
          const colorClass = getTypeColor(option.type);
          
          return (
            <div key={option.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className={`inline-flex p-3 bg-${colorClass}-100 rounded-full mb-3`}>
                  {getConnectivityIcon(option.type)}
                </div>
                <h4 className="text-lg font-semibold mb-1">{formatType(option.type)}</h4>
                <p className="text-gray-600">{option.provider}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Data:</span>
                  <span className="font-semibold">{option.data}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Validity:</span>
                  <span className="font-semibold">{option.validity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Coverage:</span>
                  <span className="font-semibold">{option.coverage.join(', ')}</span>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-green-600">${option.cost}</div>
                <div className="text-sm text-gray-500">
                  {option.type === 'wifi-hotspot' ? 'per day' : 'total'}
                </div>
              </div>

              <button
                onClick={() => onSelectOption(option)}
                className={`w-full bg-${colorClass}-600 text-white py-2 px-4 rounded-lg hover:bg-${colorClass}-700 transition-colors font-medium`}
              >
                Select Option
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Connectivity Tips</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• eSIM is convenient for modern phones - no physical card needed</li>
          <li>• WiFi hotspots are great for sharing with multiple devices</li>
          <li>• Local SIM cards often offer the best rates for longer stays</li>
          <li>• Check your phone's compatibility before choosing eSIM</li>
        </ul>
      </div>
    </div>
  );
}