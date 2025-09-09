export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  popularActivities: string[];
  bestTimeToVisit: string;
  averageStay: string;
}

export interface TripCost {
  flights: number;
  accommodation: number;
  food: number;
  activities: number;
  transport: number;
  total: number;
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
  }>;
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Array<{
    time: string;
    activity: string;
    location: string;
    cost: number;
    duration: string;
  }>;
}

export interface Vendor {
  id: string;
  name: string;
  type: 'hotel' | 'guide' | 'transport' | 'activity';
  rating: number;
  reviews: number;
  price: number;
  image: string;
  features: string[];
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  paidBy: string;
}

export interface TravelDocument {
  id: string;
  type: string;
  name: string;
  expiryDate: string;
  file?: string;
}

export interface TripData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  tripType: string;
  budget: string;
  preferences: string[];
  cities?: string[];
  transportPreference?: 'fastest' | 'cheapest' | 'eco-friendly';
}

export interface TransportOption {
  id: string;
  mode: 'flight' | 'train' | 'bus' | 'taxi' | 'rideshare' | 'rental-car';
  provider: string;
  duration: string;
  cost: number;
  departure: string;
  arrival: string;
  ecoScore: number;
  features: string[];
  bookingUrl?: string;
}

export interface LocalExperience {
  id: string;
  title: string;
  type: 'cultural' | 'food' | 'adventure' | 'nature' | 'nightlife';
  description: string;
  cost: number;
  duration: string;
  rating: number;
  image: string;
  location: string;
  availability: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  distance: string;
  image: string;
  features: string[];
  peakHours: string;
  bookingAvailable: boolean;
}

export interface TravelInsurance {
  id: string;
  provider: string;
  type: 'basic' | 'comprehensive' | 'adventure';
  coverage: string[];
  cost: number;
  duration: string;
  features: string[];
}

export interface ConnectivityOption {
  id: string;
  type: 'sim-card' | 'esim' | 'wifi-hotspot' | 'roaming';
  provider: string;
  cost: number;
  data: string;
  validity: string;
  coverage: string[];
}

export interface EmergencyContact {
  type: 'hospital' | 'police' | 'embassy' | 'fire' | 'tourist-helpline';
  name: string;
  phone: string;
  address: string;
  distance: string;
}