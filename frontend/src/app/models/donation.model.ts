import { User } from './user.model';

export enum DonationStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED'
}

export interface Donation {
  id?: number;
  title: string;
  description: string;
  category: string;
  condition?: string;
  quantity: number;
  location?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  status?: DonationStatus;
  imageUrls?: string;
  pickupInstructions?: string;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  donor?: User;
}

export interface DonationRequest {
  title: string;
  description: string;
  category: string;
  condition?: string;
  quantity: number;
  location?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  imageUrls?: string;
  pickupInstructions?: string;
  expiresAt?: Date;
}

export interface DonationFilters {
  category?: string;
  city?: string;
  state?: string;
  status?: DonationStatus;
  search?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
