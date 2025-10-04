import { useState, useMemo, useCallback } from 'react';
import { Title, Pagination, Box, Group, Text, Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { Layout } from '../components/Layout';
import { PropertyFilter } from '../features/properties/components/PropertyFilter';
import { PropertyList } from '../features/properties/components/PropertyList';
import { useProperties } from '../features/properties/hooks/useProperties';
import type { PropertyFilters as IPropertyFilters } from '../features/properties/types/property.types';

export const PropertiesPage = () => {
  const [textFilters, setTextFilters] = useState({
    name: '',
    address: ''
  });
  const [priceFilters, setPriceFilters] = useState({
    minPrice: 50000000,
    maxPrice: 5000000000
  });
  const [activePage, setActivePage] = useState(1);
  const resultsPerPage = 3;

  const allFilters = useMemo(() => ({
    ...textFilters,
    ...priceFilters
  }), [textFilters, priceFilters]);

  const { properties, loading, error } = useProperties(allFilters);

  const paginatedProperties = useMemo(() => {
    if (!properties || properties.length === 0) return [];
    const startIndex = (activePage - 1) * resultsPerPage;
    return properties.slice(startIndex, startIndex + resultsPerPage);
  }, [properties, activePage, resultsPerPage]);

  const totalPages = useMemo(() => {
    if (!properties || properties.length === 0) return 0;
    return Math.ceil(properties.length / resultsPerPage);
  }, [properties, resultsPerPage]);

  const handleFiltersChange = useCallback((newFilters: IPropertyFilters) => {
    setTextFilters({
      name: newFilters.name || '',
      address: newFilters.address || ''
    });
    setPriceFilters({
      minPrice: newFilters.minPrice || 50000000,
      maxPrice: newFilters.maxPrice || 5000000000
    });
    
    if (newFilters.name !== textFilters.name || newFilters.address !== textFilters.address) {
      setActivePage(1);
    }
  }, [textFilters.name, textFilters.address]);

  const handlePageChange = useCallback((page: number) => {
    setActivePage(page);
  }, []);

  const showNoResults = !loading && properties && properties.length === 0;

  return (
    <Layout>
      <div className='Header'>
        <Title order={2} pe="lg" mb="lg">Catálogo de Propiedades</Title>
        
        <PropertyFilter onFiltersChange={handleFiltersChange} />
        
        {!loading && properties && properties.length > 0 && (
          <Group justify="space-between" mb="md">
            <Text size="sm" c="dimmed">
              Página {activePage} de {totalPages} - {paginatedProperties.length} de {properties.length} propiedades
            </Text>
          </Group>
        )}

        {showNoResults && (
          <Alert 
            variant="light" 
            color="blue" 
            title="No se encontraron propiedades" 
            icon={<IconInfoCircle />}
            mt="md"
          >
            No hay propiedades que coincidan con los filtros aplicados.
          </Alert>
        )}

        <PropertyList 
          properties={paginatedProperties} 
          loading={loading} 
          error={error} 
        />

        {!loading && properties && properties.length > 0 && totalPages > 1 && (
          <Box mt="xl" style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              value={activePage}
              onChange={handlePageChange}
              total={totalPages}
              siblings={1}
              boundaries={1}
              size="md"
            />
          </Box>
        )}
      </div>
    </Layout>
  );
};