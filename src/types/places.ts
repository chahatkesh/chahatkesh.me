/**
 * Visited place types used by admin CRUD and public map page.
 */

export interface VisitedPlace {
  _id: string;
  name: string;
  location: string;
  shortNote?: string;
  visitedAt: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface PlaceListApiResponse {
  success: boolean;
  data: VisitedPlace[];
}

export interface PlaceItemApiResponse {
  success: boolean;
  data: VisitedPlace;
}
