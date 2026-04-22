import { mockFacilities, mockReviews } from "@/data/mock-data";
import type { Facility, FacilityFilters, Review } from "@/types";
import { createPublicSupabaseClient } from "./supabase/public";

function sortFacilities(items: Facility[]) {
  return [...items].sort((a, b) => {
    if (a.sponsoredRank !== b.sponsoredRank) return a.sponsoredRank - b.sponsoredRank;
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    if (a.averageRating !== b.averageRating) return b.averageRating - a.averageRating;
    return b.reviewCount - a.reviewCount;
  });
}

export function filterFacilities(items: Facility[], filters: FacilityFilters) {
  return items.filter((facility) => {
    const search = filters.q?.trim().toLowerCase();
    const matchesSearch =
      !search ||
      [
        facility.name,
        facility.area,
        facility.nearestStation,
        facility.address,
        facility.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search);

    return (
      matchesSearch &&
      (!filters.area || facility.area === filters.area) &&
      (!filters.station || facility.nearestStation === filters.station) &&
      (!filters.dropIn || facility.hasDropIn) &&
      (!filters.canCall || facility.canCall) &&
      (!filters.privateRoom || facility.hasPrivateRoom) &&
      (!filters.wifi || facility.hasWifi) &&
      (!filters.power || facility.hasPower) &&
      (!filters.stationNearby || facility.walkMinutes <= 5)
    );
  });
}

export async function getFacilities(filters: FacilityFilters = {}) {
  const supabase = createPublicSupabaseClient();

  if (!supabase) {
    return sortFacilities(filterFacilities(mockFacilities, filters));
  }

  const { data } = await supabase.from("facilities").select("*").eq("status", "published");
  const facilities = ((data as Record<string, unknown>[] | null) ?? []).map(mapFacilityRecord);

  if (facilities.length === 0) {
    return sortFacilities(filterFacilities(mockFacilities, filters));
  }

  return sortFacilities(filterFacilities(facilities, filters));
}

export async function getFacilityBySlug(slug: string) {
  const supabase = createPublicSupabaseClient();

  if (!supabase) {
    return mockFacilities.find((facility) => facility.slug === slug) ?? null;
  }

  const { data } = await supabase.from("facilities").select("*").eq("slug", slug).single();

  if (!data) {
    return mockFacilities.find((facility) => facility.slug === slug) ?? null;
  }

  return mapFacilityRecord(data as Record<string, unknown>);
}

export async function getReviewsForFacility(facilityId: string): Promise<Review[]> {
  const supabase = createPublicSupabaseClient();

  if (!supabase) {
    return mockReviews.filter((review) => review.facilityId === facilityId);
  }

  const { data } = await supabase.from("reviews").select("*").eq("facility_id", facilityId).order("created_at", {
    ascending: false,
  });

  const reviews = ((data as Record<string, unknown>[] | null) ?? []).map(mapReviewRecord);

  if (reviews.length === 0) {
    return mockReviews.filter((review) => review.facilityId === facilityId);
  }

  return reviews;
}

export function getFeaturedFacilities(limit = 3) {
  return sortFacilities(mockFacilities).slice(0, limit);
}

function mapFacilityRecord(record: Record<string, unknown>): Facility {
  return {
    id: String(record.id),
    slug: String(record.slug),
    name: String(record.name),
    description: String(record.description),
    address: String(record.address),
    prefecture: String(record.prefecture),
    city: String(record.city),
    area: String(record.area),
    nearestStation: String(record.nearest_station ?? record.nearestStation),
    walkMinutes: Number(record.walk_minutes ?? record.walkMinutes ?? 0),
    priceInfo: String(record.price_info ?? record.priceInfo),
    businessHours: String(record.business_hours ?? record.businessHours),
    hasDropIn: Boolean(record.has_drop_in ?? record.hasDropIn),
    canCall: Boolean(record.can_call ?? record.canCall),
    hasPrivateRoom: Boolean(record.has_private_room ?? record.hasPrivateRoom),
    seatTypes: Array.isArray(record.seat_types) ? (record.seat_types as string[]) : [],
    hasPower: Boolean(record.has_power ?? record.hasPower),
    hasWifi: Boolean(record.has_wifi ?? record.hasWifi),
    quietnessLevel: Number(record.quietness_level ?? record.quietnessLevel ?? 0),
    businessInquiryAvailable: Boolean(
      record.business_inquiry_available ?? record.businessInquiryAvailable,
    ),
    officialUrl: record.official_url ? String(record.official_url) : undefined,
    imageUrl: String(record.image_url ?? record.imageUrl),
    galleryImages: Array.isArray(record.gallery_images)
      ? (record.gallery_images as string[])
      : [String(record.image_url ?? record.imageUrl)],
    averageRating: Number(record.average_rating ?? record.averageRating ?? 0),
    reviewCount: Number(record.review_count ?? record.reviewCount ?? 0),
    featured: Boolean(record.featured),
    sponsoredRank: Number(record.sponsored_rank ?? record.sponsoredRank ?? 999),
  };
}

function mapReviewRecord(record: Record<string, unknown>): Review {
  return {
    id: String(record.id),
    facilityId: String(record.facility_id ?? record.facilityId),
    facilitySlug: String(record.facility_slug ?? record.facilitySlug),
    userName: String(record.user_name ?? record.userName),
    userRole: String(record.user_role ?? record.userRole) as Review["userRole"],
    rating: Number(record.rating ?? 0),
    quietnessRating: Number(record.quietness_rating ?? record.quietnessRating ?? 0),
    callEaseRating: Number(record.call_ease_rating ?? record.callEaseRating ?? 0),
    equipmentRating: Number(record.equipment_rating ?? record.equipmentRating ?? 0),
    comment: String(record.comment),
    visitedAt: String(record.visited_at ?? record.visitedAt ?? ""),
    createdAt: String(record.created_at ?? record.createdAt ?? ""),
  };
}
