import { useState, useEffect, useCallback } from 'react';
import type { Property, PropertyFilters } from '../types/property.types';
import { propertyService } from '../services/propertyService';
import type { ServiceError } from '../types/property.types';

export const useProperties = (filters: PropertyFilters) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await propertyService.getProperties(filters);
            setProperties(data);
        } catch (err: ServiceError | Error | unknown ) {
            const message = (err as ServiceError)?.message || 
                           (err as Error)?.message || 
                           'Failed to fetch properties';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchProperties();
    }, [filters.name, filters.address, filters.minPrice, filters.maxPrice, fetchProperties]);

    return { properties, loading, error, refetch: fetchProperties };
};