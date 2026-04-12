export type UserRole = 'student' | 'worker' | 'sales' | 'other';
export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';
export type AgeGroup = '10s' | '20s' | '30s' | '40s' | '50s' | '60s+';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role?: UserRole;
  gender?: Gender;
  ageGroup?: AgeGroup;
  createdAt: number;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  address: string;
  prefecture: string;
  city: string;
  area: string;
  nearestStation: string;
  walkMinutes: number;
  priceInfo: string;
  businessHours: string;
  hasDropIn: boolean;
  canCall: boolean;
  hasPrivateRoom: boolean;
  seatTypes: string[];
  hasPower: boolean;
  hasWifi: boolean;
  quietnessLevel: number; // 1-5
  isBusinessInquiryAvailable: boolean;
  images: string[];
  status: 'published' | 'draft';
  isFeatured: boolean;
  sponsoredRank: number;
  averageRating: number;
  reviewCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface Review {
  id: string;
  facilityId: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  userRole?: UserRole;
  userGender?: Gender;
  userAgeGroup?: AgeGroup;
  rating: number; // 1-5
  quietnessRating: number;
  callEaseRating: number;
  facilitySatisfactionRating: number;
  comment: string;
  images?: string[];
  createdAt: number;
}

export interface BusinessInquiry {
  id: string;
  facilityId?: string;
  companyName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  content: string;
  createdAt: number;
  status: 'new' | 'contacted' | 'closed';
}
