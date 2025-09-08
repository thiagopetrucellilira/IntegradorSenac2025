import { User } from './user.model';
import { Donation } from './donation.model';

export enum MatchStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface Match {
  id?: number;
  donation?: Donation;
  requester?: User;
  message?: string;
  status?: MatchStatus;
  scheduledDate?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MatchRequest {
  message?: string;
  scheduledDate?: Date;
}

export interface UpdateMatchStatusRequest {
  status: MatchStatus;
  notes?: string;
}
