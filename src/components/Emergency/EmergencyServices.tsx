import React from 'react';
import { Phone, MapPin, AlertTriangle, Guitar as Hospital, Shield, Building } from 'lucide-react';
import { EmergencyContact } from '../../types';

interface EmergencyServicesProps {
  emergencyContacts: EmergencyContact[];
}

export default function EmergencyServices({ emergencyContacts }: EmergencyServicesProps) {
  const getContactIcon = (type: string) => {
    switch (type) {
      case 'hospital': return <Hospital className="h-5 w-5" />;
      case 'police': return <Shield className="h-5 w-5" />;
      case 'embassy': return <Building className="h-5 w-5" />;
      case 'fire': return <AlertTriangle className="h-5 w-5" />;
      case 'tourist-helpline': return <Phone className="h-5 w-5" />;
      default: return <Phone className="h-5 w-5" />;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'hospital': return 'red';
      case 'police': return 'blue';
      case 'embassy': return 'purple';
      case 'fire': return 'orange';
      case 'tourist-helpline': return 'green';
      default: return 'gray';
    }
  };

  const formatContactType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleGetDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold">Emergency Services</h3>
        </div>
        <p className="text-gray-600">Important contacts and services for your safety</p>
      </div>

      {/* SOS Button */}
      <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
        <div className="text-center">
          <button className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-lg">
            🆘 EMERGENCY SOS
          </button>
          <p className="text-red-800 text-sm mt-2">
            Sends your location to emergency contacts and local authorities
          </p>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyContacts.map((contact, index) => {
          const colorClass = getContactColor(contact.type);
          
          return (
            <div key={index} className={`border-2 border-${colorClass}-200 rounded-lg p-4 hover:shadow-md transition-shadow`}>
              <div className="flex items-start space-x-3">
                <div className={`p-2 bg-${colorClass}-100 rounded-lg flex-shrink-0`}>
                  {getContactIcon(contact.type)}
                </div>
                
                <div className="flex-grow">
                  <h4 className="font-semibold text-lg mb-1">{contact.name}</h4>
                  <p className={`text-${colorClass}-600 text-sm font-medium mb-2 capitalize`}>
                    {formatContactType(contact.type)}
                  </p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {contact.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {contact.address} • {contact.distance}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className={`flex-1 bg-${colorClass}-600 text-white py-2 px-3 rounded-lg hover:bg-${colorClass}-700 transition-colors font-medium text-sm`}
                    >
                      Call Now
                    </button>
                    <button
                      onClick={() => handleGetDirections(contact.address)}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Tips */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-900 mb-3">Safety Tips</h4>
        <ul className="text-yellow-800 text-sm space-y-1">
          <li>• Save these numbers in your phone before traveling</li>
          <li>• Keep a copy of important documents in a separate location</li>
          <li>• Share your itinerary with trusted contacts at home</li>
          <li>• Register with your embassy if traveling internationally</li>
          <li>• Keep emergency cash in local currency</li>
        </ul>
      </div>
    </div>
  );
}