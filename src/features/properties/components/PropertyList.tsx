import { Grid, Loader, Center, Alert, Title } from '@mantine/core';
import type { Property } from '../types/property.types';
import { PropertyCard } from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  loading: boolean;
  error: string | null;
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties, loading, error }) => {
  if (loading) {
    return (
      <Center h={300}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return <Alert color="red" title="Error">{error}</Alert>;
  }

  if (properties.length === 0) {
    return (
      <Center h={300}>
        <Title order={3} c="dimmed">No se encontraron propiedades con los filtros seleccionados.</Title>
      </Center>
    );
  }

  return (
    <Grid mb={60}>
      {properties.map((property) => (
        <Grid.Col key={property.id || `${property.name}-${property.addressProperty}`} span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
          <PropertyCard property={property} />
        </Grid.Col>
      ))}
    </Grid>
  );
};