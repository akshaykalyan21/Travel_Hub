import { TripCost, ItineraryDay, Expense, TravelDocument } from '../types';

export const generateMockCosts = (destination: string, travelers: number, days: number): TripCost => {
  const baseCostPerDay = {
    budget: { flights: 400, accommodation: 50, food: 30, activities: 40, transport: 20 },
    'mid-range': { flights: 700, accommodation: 150, food: 70, activities: 80, transport: 40 },
    luxury: { flights: 1500, accommodation: 400, food: 150, activities: 200, transport: 80 }
  };

  const defaultCosts = baseCostPerDay['mid-range'];
  
  return {
    flights: defaultCosts.flights * travelers,
    accommodation: defaultCosts.accommodation * days,
    food: defaultCosts.food * days * travelers,
    activities: defaultCosts.activities * days * travelers,
    transport: defaultCosts.transport * days * travelers,
    total: (defaultCosts.flights * travelers) + 
           (defaultCosts.accommodation * days) + 
           ((defaultCosts.food + defaultCosts.activities + defaultCosts.transport) * days * travelers)
  };
};

export const generateMockItinerary = (destination: string, startDate: string, days: number): ItineraryDay[] => {
  const activities = {
    'Bali': [
      { activity: 'Arrival & Check-in', location: 'Seminyak Beach Resort', cost: 0, duration: '2 hours' },
      { activity: 'Beach Relaxation', location: 'Seminyak Beach', cost: 15, duration: '3 hours' },
      { activity: 'Sunset Dinner', location: 'Ku De Ta', cost: 80, duration: '2 hours' },
      { activity: 'Temple Tour', location: 'Tanah Lot Temple', cost: 25, duration: '3 hours' },
      { activity: 'Rice Terrace Trek', location: 'Jatiluwih Rice Terraces', cost: 35, duration: '4 hours' },
      { activity: 'Spa Treatment', location: 'Bliss Sanctuary Spa', cost: 120, duration: '2 hours' },
      { activity: 'Water Sports', location: 'Nusa Dua Beach', cost: 60, duration: '3 hours' },
      { activity: 'Cultural Dance Show', location: 'Ubud Palace', cost: 40, duration: '2 hours' },
      { activity: 'Market Shopping', location: 'Ubud Traditional Market', cost: 50, duration: '2 hours' },
      { activity: 'Departure', location: 'Ngurah Rai Airport', cost: 30, duration: '2 hours' }
    ],
    'Paris': [
      { activity: 'Arrival & Check-in', location: 'Hotel Le Marais', cost: 0, duration: '2 hours' },
      { activity: 'Eiffel Tower Visit', location: 'Champ de Mars', cost: 30, duration: '3 hours' },
      { activity: 'Seine River Cruise', location: 'Pont Neuf', cost: 25, duration: '2 hours' },
      { activity: 'Louvre Museum', location: 'Palais du Louvre', cost: 17, duration: '4 hours' },
      { activity: 'Montmartre Walk', location: 'Sacré-Cœur', cost: 0, duration: '3 hours' },
      { activity: 'French Cooking Class', location: 'Le Cordon Bleu', cost: 120, duration: '4 hours' },
      { activity: 'Palace of Versailles', location: 'Versailles', cost: 40, duration: '6 hours' },
      { activity: 'Wine Tasting', location: 'Le Marais Wine Bar', cost: 65, duration: '2 hours' },
      { activity: 'Shopping', location: 'Champs-Élysées', cost: 100, duration: '3 hours' },
      { activity: 'Departure', location: 'Charles de Gaulle Airport', cost: 35, duration: '2 hours' }
    ]
  };

  const defaultActivities = [
    { activity: 'City Tour', location: 'Downtown', cost: 40, duration: '3 hours' },
    { activity: 'Local Museum', location: 'Cultural Center', cost: 25, duration: '2 hours' },
    { activity: 'Traditional Restaurant', location: 'Old Town', cost: 60, duration: '2 hours' },
    { activity: 'Shopping District', location: 'Main Street', cost: 80, duration: '3 hours' },
    { activity: 'Scenic Viewpoint', location: 'City Overlook', cost: 15, duration: '2 hours' }
  ];

  const destinationActivities = activities[destination as keyof typeof activities] || defaultActivities;
  const itinerary: ItineraryDay[] = [];
  
  for (let day = 1; day <= days; day++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day - 1);
    
    const dayActivities = destinationActivities
      .slice((day - 1) * 3, day * 3)
      .map((activity, index) => ({
        ...activity,
        time: index === 0 ? '09:00' : index === 1 ? '14:00' : '19:00'
      }));

    // If we run out of specific activities, cycle through them
    while (dayActivities.length < 3) {
      const randomActivity = destinationActivities[Math.floor(Math.random() * destinationActivities.length)];
      dayActivities.push({
        ...randomActivity,
        time: dayActivities.length === 0 ? '09:00' : dayActivities.length === 1 ? '14:00' : '19:00'
      });
    }

    itinerary.push({
      day,
      date: date.toISOString().split('T')[0],
      activities: dayActivities
    });
  }

  return itinerary;
};

export const generateMockExpenses = (): Expense[] => {
  return [
    {
      id: '1',
      date: '2025-01-15',
      category: 'food',
      amount: 120,
      description: 'Dinner at seaside restaurant',
      paidBy: 'John'
    },
    {
      id: '2',
      date: '2025-01-14',
      category: 'transport',
      amount: 45,
      description: 'Taxi to hotel',
      paidBy: 'Sarah'
    },
    {
      id: '3',
      date: '2025-01-14',
      category: 'activities',
      amount: 80,
      description: 'Temple entrance fees',
      paidBy: 'John'
    }
  ];
};

export const generateMockDocuments = (): TravelDocument[] => {
  return [
    {
      id: '1',
      type: 'passport',
      name: 'US Passport',
      expiryDate: '2025-06-15'
    },
    {
      id: '2',
      type: 'flight-ticket',
      name: 'Flight to Bali',
      expiryDate: '2025-01-20'
    },
    {
      id: '3',
      type: 'insurance',
      name: 'Travel Insurance Policy',
      expiryDate: '2025-01-25'
    }
  ];
};

export const generateMockReviews = () => {
  return [
    {
      id: '1',
      user: 'Sarah Johnson',
      avatar: '',
      rating: 5,
      title: 'Amazing experience in Bali!',
      content: 'The trip planning was excellent and the recommendations were spot on. The local guide was incredibly knowledgeable and friendly. Would definitely use this service again!',
      date: '2025-01-10',
      helpful: 12,
      category: 'guides',
      verified: true
    },
    {
      id: '2',
      user: 'Mike Chen',
      avatar: '',
      rating: 4,
      title: 'Great hotel recommendations',
      content: 'The hotel suggestions were perfect for our budget and location preferences. The booking process was smooth and we got great rates.',
      date: '2025-01-08',
      helpful: 8,
      category: 'hotels',
      verified: true
    },
    {
      id: '3',
      user: 'Emma Wilson',
      avatar: '',
      rating: 5,
      title: 'Perfect family vacation planning',
      content: 'Planning a trip for 4 people seemed overwhelming, but this platform made it so easy. The itinerary was well-balanced with activities for both adults and kids.',
      date: '2025-01-05',
      helpful: 15,
      category: 'activities',
      verified: false
    }
  ];
};