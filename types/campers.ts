export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CampersTruck[];
}

export interface CampersTruck {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: CampersAmenities[];
  createdAt: string;
  updatedAt: string;
  coverImage: string;
  totalReviews: number;
}

export interface Truck {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: CampersAmenities[];
  gallery: TruckGallery[];
  createdAt: string;
  updatedAt: string;
  coverImage: string;
  totalReviews: number;
}
export interface TruckGallery {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export type CampersAmenities =
  | "ac"
  | "bathroom"
  | "kitchen"
  | "radio"
  | "refrigerator"
  | "microwave"
  | "gas"
  | "water";

export interface Filters {
  forms: string;
  transmissions: string;
  engines: string;
}
export interface Review {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}
