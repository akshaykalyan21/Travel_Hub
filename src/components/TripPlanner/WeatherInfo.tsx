import React from 'react';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';
import { WeatherInfo as WeatherData } from '../../types';

interface WeatherInfoProps {
  weather: WeatherData;
  destination: string;
}

export default function WeatherInfo({ weather, destination }: WeatherInfoProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'partly cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'light rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Weather in {destination}</h3>
      
      {/* Current Weather */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{weather.temperature}°C</div>
            <div className="text-gray-600 flex items-center mt-1">
              {getWeatherIcon(weather.condition)}
              <span className="ml-2">{weather.condition}</span>
            </div>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div className="flex items-center mb-1">
              <Wind className="h-4 w-4 mr-1" />
              {weather.windSpeed} km/h
            </div>
            <div>Humidity: {weather.humidity}%</div>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div>
        <h4 className="font-medium mb-3">5-Day Forecast</h4>
        <div className="grid grid-cols-5 gap-2">
          {weather.forecast.map((day, index) => (
            <div key={index} className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs font-medium text-gray-600 mb-1">{day.day}</div>
              <div className="flex justify-center mb-1">
                {getWeatherIcon(day.condition)}
              </div>
              <div className="text-sm font-semibold">{day.temp}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}