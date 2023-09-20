// models/restaurantModel.ts

export interface Restaurant {
  place_id: string;
  name: string;
  types: string[];
  rating: number;
  price_level: number;
  vicinity: string;
  distance: number; // in meters
  photos?: Array<{
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }>;
}

declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLEAPI: string;
  }
}