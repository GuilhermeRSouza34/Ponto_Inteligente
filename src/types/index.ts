export interface User {
  id: string;
  email: string;
  name: string;
}

export interface BusRoute {
  id: string;
  name: string;
  number: string;
  stops: BusStop[];
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  estimatedArrival?: Date;
}

export interface BusStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface BusLocation {
  busId: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  speed: number;
} 