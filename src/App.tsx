import React, { useState } from 'react';
import Header from './components/Header';
import TripPlannerForm from './components/TripPlanner/TripPlannerForm';
import WeatherInfo from './components/TripPlanner/WeatherInfo';
import CostEstimator from './components/TripPlanner/CostEstimator';
import ItineraryGenerator from './components/Itinerary/ItineraryGenerator';
import VendorRecommendations from './components/Booking/VendorRecommendations';
import ExpenseTracker from './components/TripManagement/ExpenseTracker';
import DocumentOrganizer from './components/TripManagement/DocumentOrganizer';
import ReviewsRatings from './components/Reviews/ReviewsRatings';
import TransportFinder from './components/Transport/TransportFinder';
import LocalExperiences from './components/LocalServices/LocalExperiences';
import RestaurantFinder from './components/LocalServices/RestaurantFinder';
import InsuranceRecommendations from './components/TravelServices/InsuranceRecommendations';
import ConnectivityOptions from './components/TravelServices/ConnectivityOptions';
import EmergencyServices from './components/Emergency/EmergencyServices';

import { popularDestinations, mockVendors, mockWeather } from './data/mockData';
import { 
  mockTransportOptions, 
  mockLocalExperiences, 
  mockRestaurants, 
  mockInsuranceOptions, 
  mockConnectivityOptions, 
  mockEmergencyContacts 
} from './data/mockData';
import { 
  generateMockCosts, 
  generateMockItinerary, 
  generateMockExpenses, 
  generateMockDocuments,
  generateMockReviews 
} from './utils/mockDataGenerator';

import { TripData, Expense, TravelDocument, Vendor, TransportOption, LocalExperience, Restaurant, TravelInsurance, ConnectivityOption } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('plan');
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>(generateMockExpenses());
  const [documents, setDocuments] = useState<TravelDocument[]>(generateMockDocuments());

  const handleTripPlan = (data: TripData) => {
    setTripData(data);
  };

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: Math.random().toString(36).substr(2, 9)
    };
    setExpenses([...expenses, expense]);
  };

  const handleAddDocument = (newDocument: Omit<TravelDocument, 'id'>) => {
    const document: TravelDocument = {
      ...newDocument,
      id: Math.random().toString(36).substr(2, 9)
    };
    setDocuments([...documents, document]);
  };

  const handleVendorBooking = (vendor: Vendor) => {
    alert(`Booking ${vendor.name} - This would integrate with actual booking APIs`);
  };

  const handleTransportSelect = (transport: TransportOption) => {
    alert(`Selected ${transport.mode} with ${transport.provider} - This would integrate with booking APIs`);
  };

  const handleExperienceBooking = (experience: LocalExperience) => {
    alert(`Booking ${experience.title} - This would integrate with booking APIs`);
  };

  const handleRestaurantBooking = (restaurant: Restaurant) => {
    alert(`Booking table at ${restaurant.name} - This would integrate with reservation APIs`);
  };

  const handleInsuranceSelect = (insurance: TravelInsurance) => {
    alert(`Selected ${insurance.type} insurance from ${insurance.provider} - This would integrate with insurance APIs`);
  };

  const handleConnectivitySelect = (option: ConnectivityOption) => {
    alert(`Selected ${option.type} from ${option.provider} - This would integrate with connectivity APIs`);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'plan':
        return (
          <div className="space-y-8">
            {!tripData ? (
              <div>
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white rounded-3xl p-8 md:p-12 mb-8">
                  <div className="max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      Plan Your Perfect Journey
                    </h2>
                    <p className="text-xl mb-6 opacity-90">
                      AI-powered travel planning with personalized itineraries, cost estimates, and trusted vendor recommendations
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">10M+</div>
                        <div className="text-sm opacity-80">Trips Planned</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">50K+</div>
                        <div className="text-sm opacity-80">Trusted Vendors</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">4.9★</div>
                        <div className="text-sm opacity-80">Average Rating</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Destinations */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6">Popular Destinations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularDestinations.map((destination) => (
                      <div key={destination.id} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h4 className="font-semibold text-lg">{destination.name}</h4>
                            <p className="text-sm opacity-90">{destination.country}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <TripPlannerForm onTripPlan={handleTripPlan} />
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2">Your {tripData.destination} Trip Plan</h2>
                  <p className="text-gray-600">
                    {tripData.startDate} to {tripData.endDate} • {tripData.travelers} travelers
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <ItineraryGenerator
                      itinerary={generateMockItinerary(
                        tripData.destination,
                        tripData.startDate,
                        Math.ceil((new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) / (1000 * 3600 * 24)) + 1
                      )}
                      destination={tripData.destination}
                    />
                  </div>
                  <div className="space-y-6">
                    <WeatherInfo weather={mockWeather} destination={tripData.destination} />
                    <CostEstimator
                      costs={generateMockCosts(
                        tripData.destination,
                        tripData.travelers,
                        Math.ceil((new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) / (1000 * 3600 * 24)) + 1
                      )}
                      budget={tripData.budget}
                    />
                  </div>
                </div>

                <VendorRecommendations vendors={mockVendors} onBooking={handleVendorBooking} />
              </div>
            )}
          </div>
        );

      case 'transport':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Find Transport Options</h2>
              <p className="text-gray-600">Compare flights, trains, buses, and other transport modes</p>
            </div>

            <TransportFinder
              transportOptions={mockTransportOptions}
              onSelectTransport={handleTransportSelect}
            />
          </div>
        );

      case 'manage':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Manage Your Trip</h2>
              <p className="text-gray-600">Track expenses, organize documents, and monitor your travel progress</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ExpenseTracker
                expenses={expenses}
                onAddExpense={handleAddExpense}
                travelers={['John', 'Sarah', 'Mike']}
              />
              <DocumentOrganizer
                documents={documents}
                onAddDocument={handleAddDocument}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <InsuranceRecommendations
                insuranceOptions={mockInsuranceOptions}
                onSelectInsurance={handleInsuranceSelect}
              />
              <ConnectivityOptions
                connectivityOptions={mockConnectivityOptions}
                onSelectOption={handleConnectivitySelect}
              />
            </div>

            <EmergencyServices emergencyContacts={mockEmergencyContacts} />
          </div>
        );

      case 'explore':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Explore Destinations</h2>
              <p className="text-gray-600">Discover amazing places and get inspired for your next adventure</p>
            </div>

            <LocalExperiences
              experiences={mockLocalExperiences}
              onBookExperience={handleExperienceBooking}
            />

            <RestaurantFinder
              restaurants={mockRestaurants}
              onBookTable={handleRestaurantBooking}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularDestinations.map((destination) => (
                <div 
                  key={destination.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => {
                    setTripData({
                      destination: destination.name,
                      startDate: '',
                      endDate: '',
                      travelers: 1,
                      tripType: 'leisure',
                      budget: 'mid-range',
                      preferences: []
                    });
                    setCurrentPage('plan');
                  }}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{destination.name}, {destination.country}</h3>
                    <p className="text-gray-600 mb-4">{destination.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-sm">
                        <span className="font-medium">Best time to visit:</span> {destination.bestTimeToVisit}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Average stay:</span> {destination.averageStay}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {destination.popularActivities.slice(0, 3).map((activity, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <span className="text-blue-600 font-medium text-sm hover:text-blue-700">
                        Click to plan your trip →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'community':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Travel Community</h2>
              <p className="text-gray-600">Share experiences and learn from fellow travelers</p>
            </div>

            <ReviewsRatings reviews={generateMockReviews()} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Travel Hub</h4>
              <p className="text-gray-600 text-sm">
                Your ultimate travel planning companion with AI-powered recommendations and seamless booking experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Trip Planning</li>
                <li>Cost Estimation</li>
                <li>Vendor Booking</li>
                <li>Expense Tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Travel Insurance</li>
                <li>Safety Tips</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            © 2025 Travel Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;