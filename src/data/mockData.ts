import { Destination, Vendor, WeatherInfo } from '../types';
import { TransportOption, LocalExperience, Restaurant, TravelInsurance, ConnectivityOption, EmergencyContact } from '../types';

export const popularDestinations: Destination[] = [
  {
    id: '1',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with stunning beaches, temples, and rice terraces',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
    popularActivities: ['Beach Relaxation', 'Temple Tours', 'Rice Terrace Trekking', 'Spa Treatments'],
    bestTimeToVisit: 'April - October',
    averageStay: '7-10 days'
  },
  {
    id: '2',
    name: 'Paris',
    country: 'France',
    description: 'City of lights with romantic atmosphere and world-class cuisine',
    image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg',
    popularActivities: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise', 'Montmartre Walk'],
    bestTimeToVisit: 'April - June, September - November',
    averageStay: '5-7 days'
  },
  {
    id: '3',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Modern metropolis blending tradition with cutting-edge technology',
    image: 'https://images.pexels.com/photos/248195/pexels-photo-248195.jpeg',
    popularActivities: ['Shibuya Crossing', 'Temple Visits', 'Sushi Tours', 'Cherry Blossom Viewing'],
    bestTimeToVisit: 'March - May, September - November',
    averageStay: '7-14 days'
  },
  {
    id: '4',
    name: 'Santorini',
    country: 'Greece',
    description: 'Stunning Greek island with white-washed buildings and blue domes',
    image: 'https://images.pexels.com/photos/161901/santorini-greece-island-sunset-161901.jpeg',
    popularActivities: ['Sunset Viewing', 'Wine Tasting', 'Beach Hopping', 'Historical Sites'],
    bestTimeToVisit: 'April - October',
    averageStay: '4-6 days'
  }
];

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'Grand Paradise Resort',
    type: 'hotel',
    rating: 4.8,
    reviews: 2341,
    price: 250,
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
    features: ['Pool', 'Spa', 'Restaurant', 'Beach Access']
  },
  {
    id: '2',
    name: 'Local Culture Guide - Maya',
    type: 'guide',
    rating: 4.9,
    reviews: 187,
    price: 80,
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg',
    features: ['English Speaking', 'Cultural Expert', 'Photography Tips', 'Local Insider']
  },
  {
    id: '3',
    name: 'Island Hopping Adventure',
    type: 'activity',
    rating: 4.7,
    reviews: 432,
    price: 120,
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
    features: ['Boat Tour', 'Snorkeling', 'Lunch Included', 'Professional Guide']
  }
];

export const mockWeather: WeatherInfo = {
  temperature: 28,
  condition: 'Sunny',
  humidity: 65,
  windSpeed: 12,
  forecast: [
    { day: 'Today', temp: 28, condition: 'Sunny' },
    { day: 'Tomorrow', temp: 26, condition: 'Partly Cloudy' },
    { day: 'Day 3', temp: 29, condition: 'Sunny' },
    { day: 'Day 4', temp: 27, condition: 'Light Rain' },
    { day: 'Day 5', temp: 30, condition: 'Sunny' }
  ]
};

export const mockTransportOptions: TransportOption[] = [
  {
    id: '1',
    mode: 'flight',
    provider: 'AirAsia',
    duration: '2h 30m',
    cost: 299,
    departure: '08:00',
    arrival: '10:30',
    ecoScore: 6,
    features: ['Direct Flight', 'Meal Included', 'Baggage 20kg'],
    bookingUrl: '#'
  },
  {
    id: '2',
    mode: 'train',
    provider: 'Express Rail',
    duration: '6h 15m',
    cost: 89,
    departure: '07:00',
    arrival: '13:15',
    ecoScore: 9,
    features: ['Scenic Route', 'WiFi', 'Food Car'],
    bookingUrl: '#'
  },
  {
    id: '3',
    mode: 'bus',
    provider: 'Comfort Lines',
    duration: '8h 45m',
    cost: 45,
    departure: '22:00',
    arrival: '06:45+1',
    ecoScore: 8,
    features: ['Sleeper Bus', 'AC', 'Rest Stops'],
    bookingUrl: '#'
  },
  {
    id: '4',
    mode: 'rental-car',
    provider: 'DriveEasy',
    duration: '5h 30m',
    cost: 120,
    departure: 'Flexible',
    arrival: 'Flexible',
    ecoScore: 4,
    features: ['Full Tank', 'GPS', 'Insurance'],
    bookingUrl: '#'
  }
];

export const mockLocalExperiences: LocalExperience[] = [
  {
    id: '1',
    title: 'Traditional Cooking Class',
    type: 'cultural',
    description: 'Learn to cook authentic local dishes with a master chef',
    cost: 85,
    duration: '3 hours',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    location: 'Cultural Center',
    availability: ['Mon', 'Wed', 'Fri', 'Sat']
  },
  {
    id: '2',
    title: 'Street Food Walking Tour',
    type: 'food',
    description: 'Explore the best local street food with a knowledgeable guide',
    cost: 45,
    duration: '2.5 hours',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    location: 'Old Town',
    availability: ['Daily']
  },
  {
    id: '3',
    title: 'Sunrise Mountain Hike',
    type: 'adventure',
    description: 'Watch the sunrise from the highest peak with experienced guides',
    cost: 65,
    duration: '4 hours',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
    location: 'Mount Vista',
    availability: ['Daily']
  }
];

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Ocean Breeze Restaurant',
    cuisine: 'Seafood',
    rating: 4.6,
    priceRange: '$$$',
    distance: '0.3 km',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    features: ['Ocean View', 'Fresh Catch', 'Romantic Setting'],
    peakHours: '7:00 PM - 9:00 PM',
    bookingAvailable: true
  },
  {
    id: '2',
    name: 'Local Spice Kitchen',
    cuisine: 'Traditional',
    rating: 4.8,
    priceRange: '$$',
    distance: '0.8 km',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    features: ['Authentic Recipes', 'Family Owned', 'Vegetarian Options'],
    peakHours: '12:00 PM - 2:00 PM, 7:00 PM - 9:00 PM',
    bookingAvailable: true
  },
  {
    id: '3',
    name: 'Street Food Paradise',
    cuisine: 'Street Food',
    rating: 4.4,
    priceRange: '$',
    distance: '0.5 km',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    features: ['Quick Service', 'Local Favorites', 'Budget Friendly'],
    peakHours: '6:00 PM - 10:00 PM',
    bookingAvailable: false
  }
];

export const mockInsuranceOptions: TravelInsurance[] = [
  {
    id: '1',
    provider: 'SafeTravel Insurance',
    type: 'basic',
    coverage: ['Medical Emergency', 'Trip Cancellation', 'Lost Baggage'],
    cost: 45,
    duration: '7 days',
    features: ['24/7 Support', 'Online Claims', 'Worldwide Coverage']
  },
  {
    id: '2',
    provider: 'Adventure Guard',
    type: 'adventure',
    coverage: ['Extreme Sports', 'Medical Emergency', 'Equipment Coverage', 'Evacuation'],
    cost: 89,
    duration: '7 days',
    features: ['Adventure Sports', 'Mountain Rescue', 'Equipment Protection']
  },
  {
    id: '3',
    provider: 'Comprehensive Care',
    type: 'comprehensive',
    coverage: ['Medical', 'Trip Cancellation', 'Baggage', 'Flight Delay', 'Personal Liability'],
    cost: 125,
    duration: '7 days',
    features: ['Premium Coverage', 'No Deductible', 'Family Plans']
  }
];

export const mockConnectivityOptions: ConnectivityOption[] = [
  {
    id: '1',
    type: 'sim-card',
    provider: 'TravelConnect',
    cost: 25,
    data: '5GB',
    validity: '7 days',
    coverage: ['Local', 'Regional']
  },
  {
    id: '2',
    type: 'esim',
    provider: 'GlobaleSIM',
    cost: 35,
    data: '10GB',
    validity: '14 days',
    coverage: ['Worldwide']
  },
  {
    id: '3',
    type: 'wifi-hotspot',
    provider: 'PocketWiFi',
    cost: 8,
    data: 'Unlimited',
    validity: 'Per day',
    coverage: ['Local']
  }
];

export const mockEmergencyContacts: EmergencyContact[] = [
  {
    type: 'hospital',
    name: 'Central Medical Hospital',
    phone: '+1-555-0123',
    address: '123 Health Street',
    distance: '2.1 km'
  },
  {
    type: 'police',
    name: 'Tourist Police Station',
    phone: '+1-555-0911',
    address: '456 Safety Avenue',
    distance: '1.5 km'
  },
  {
    type: 'embassy',
    name: 'US Embassy',
    phone: '+1-555-0456',
    address: '789 Diplomatic Row',
    distance: '3.2 km'
  }
];