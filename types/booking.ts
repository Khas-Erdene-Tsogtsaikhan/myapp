export type ServiceCategory = 'walking' | 'grooming' | 'training' | 'veterinary';

export type BookingStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';

export interface Walker {
  id: string;
  name: string;
  rating: number;
  baseArea: string;
  price30: number;
  price60: number;
  availableToday: boolean;
}

export interface Booking {
  id: string;
  category: ServiceCategory;
  providerId: string;
  providerName: string;
  serviceName: string;
  startTimeISO: string;
  priceUSD: number;
  status: BookingStatus;
  addOns: string[];
  notes: string;
}

