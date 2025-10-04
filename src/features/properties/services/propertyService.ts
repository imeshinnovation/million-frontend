import { apiClient } from '../../../api/client';
import type { Property, PropertyFilters } from '../types/property.types';

export type CreatePropertyData = Omit<Property, '_id'>;

export const propertyService = {
  getProperties: async (filters: PropertyFilters): Promise<Property[]> => {
    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.address) params.append('address', filters.address);
    if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());

    const response = await apiClient.get<Property[]>(`/Property/?${params.toString()}`);
    return response.data;
  },

  createProperty: async (data: CreatePropertyData): Promise<Property> => {
    const response = await apiClient.post<Property>('/Property', data);
    return response.data;
  }

};
