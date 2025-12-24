import { Bike, BikeSearchResponse, BikeCountResponse } from "@/types/bike";

const BASE_URL = "https://bikeindex.org/api/v3";
const LOCATION = "Munich";
const PER_PAGE = 10;

export interface FetchBikesParams {
  page?: number;
  query?: string;
}

export interface FetchBikesResult {
  bikes: Bike[];
  total: number;
}

/**
 * Fetches stolen bikes from the BikeIndex API for the Munich area
 * 
 * NOTE: The BikeIndex API does not support date range filtering.
 * Date filtering would need to be implemented client-side after fetching results.
 * This is documented as an API limitation.
 */
export async function fetchStolenBikes({
  page = 1,
  query = "",
}: FetchBikesParams): Promise<FetchBikesResult> {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    per_page: PER_PAGE.toString(),
    location: LOCATION,
    stolenness: "proximity",
  });

  if (query.trim()) {
    searchParams.set("query", query.trim());
  }

  const [bikesResponse, countResponse] = await Promise.all([
    fetch(`${BASE_URL}/search?${searchParams.toString()}`),
    fetch(`${BASE_URL}/search/count?${searchParams.toString()}`),
  ]);

  if (!bikesResponse.ok) {
    throw new Error(`Failed to fetch bikes: ${bikesResponse.statusText}`);
  }

  if (!countResponse.ok) {
    throw new Error(`Failed to fetch count: ${countResponse.statusText}`);
  }

  const bikesData: BikeSearchResponse = await bikesResponse.json();
  const countData: BikeCountResponse = await countResponse.json();

  return {
    bikes: bikesData.bikes,
    total: countData.proximity,
  };
}

/**
 * Converts a Unix timestamp to a formatted date string
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Converts a Unix timestamp to an ISO date string (YYYY-MM-DD)
 */
export function timestampToISODate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split("T")[0];
}

/**
 * Converts an ISO date string to a Unix timestamp
 */
export function isoDateToTimestamp(isoDate: string): number {
  return Math.floor(new Date(isoDate).getTime() / 1000);
}

