export type UserRole = "student" | "worker" | "sales" | "other";
export type InquiryStatus = "new" | "contacted" | "closed";

export type Facility = {
  id: string;
  status?: "draft" | "published";
  slug: string;
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
  quietnessLevel: number;
  businessInquiryAvailable: boolean;
  officialUrl?: string;
  imageUrl: string;
  galleryImages?: string[];
  averageRating: number;
  reviewCount: number;
  featured: boolean;
  sponsoredRank: number;
};

export type Review = {
  id: string;
  facilityId: string;
  facilitySlug: string;
  userName: string;
  userRole: UserRole;
  rating: number;
  quietnessRating: number;
  callEaseRating: number;
  equipmentRating: number;
  comment: string;
  visitedAt: string;
  createdAt: string;
};

export type FacilityFilters = {
  q?: string;
  area?: string;
  station?: string;
  dropIn?: boolean;
  canCall?: boolean;
  privateRoom?: boolean;
  wifi?: boolean;
  power?: boolean;
  stationNearby?: boolean;
};

export type FacilityInsertInput = {
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
  imageUrl: string;
  officialUrl?: string;
  seatTypes: string[];
  quietnessLevel: number;
  hasDropIn: boolean;
  canCall: boolean;
  hasPrivateRoom: boolean;
  hasPower: boolean;
  hasWifi: boolean;
  businessInquiryAvailable: boolean;
  featured: boolean;
  sponsoredRank: number;
  status: "draft" | "published";
};
