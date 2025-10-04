export interface Property {
  id: string;
  idOwner: string;
  name: string;
  addressProperty: string;
  priceProperty: number;
  imageUrl: string;
}

export interface PropertyFilters {
  name?: string;
  address?: string;
  minPrice: number;
  maxPrice: number;
}

export interface ServiceError {
    message: string;
    status?: number;
}