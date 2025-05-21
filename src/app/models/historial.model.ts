export interface Rating {
  userId: string;
  rating: number;
  comment: string;
}

export interface Drone {
  id: string;
  name: string;
  model: string;
  price: number;
  description: string;
  images: string[];
  type: 'venta' | 'alquiler';
  condition: 'nuevo' | 'usado';
  location: string;
  contact: string;
  category: string;
  sellerId: string;
  createdAt?: Date;
  ratings?: Rating[];
}

export interface Historial {
  _id?: any;
  userId: string;
  droneId: string;
  fecha: Date;
  droneSaved?: Drone;
}
