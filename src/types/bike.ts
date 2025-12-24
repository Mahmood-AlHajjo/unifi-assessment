export interface Bike {
  id: number;
  title: string;
  description: string | null;
  date_stolen: number;
  stolen_location: string;
  manufacturer_name: string;
  frame_model: string | null;
  frame_colors: string[];
  serial: string;
  year: number | null;
  thumb: string | null;
  large_img: string | null;
  url: string;
  status: string;
  stolen: boolean;
  stolen_coordinates: [number, number] | null;
  is_stock_img: boolean;
  external_id: string | null;
  registry_name: string | null;
  registry_url: string | null;
  location_found: string | null;
  propulsion_type_slug: string;
  cycle_type_slug: string;
}

export interface BikeSearchResponse {
  bikes: Bike[];
}

export interface BikeCountResponse {
  non: number;
  stolen: number;
  proximity: number;
  for_sale: number;
}

export interface SearchFilters {
  query: string;
  dateFrom: string;
  dateTo: string;
  page: number;
}

