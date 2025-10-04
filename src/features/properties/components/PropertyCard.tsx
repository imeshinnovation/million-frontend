import { Card, Image, Text, Title, Badge, Group, Center } from '@mantine/core';
import type { Property } from '../types/property.types';
import { formatPrice } from '../../../utils/formatters';
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {

  const navigate = useNavigate();

  return (
    <Card shadow="md" p="sm" radius="md" h="100%" mt="lg"
      style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', cursor: 'pointer' }}
      onClick={() => navigate('/viewproperty', { state: property })}
      data-testid={`property-card-${property.id}`}
    >
      <Card.Section>
        <Image
          src={property.imageUrl}
          height={160}
          alt={property.name}
          fallbackSrc="https://placehold.co/600x400?text=Imagen+no+disponible"
        />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <Title order={4}>{property.name}</Title>
        <Badge color="green" variant="light">
          Venta
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" mt="xs">
        Dirección: {property.addressProperty}
      </Text>


      <Card.Section p="md">
        <Center mt="md">
          <Text size="lg" fw={500} c="blue">
            Precio: {formatPrice(property.priceProperty)}
          </Text>
        </Center>
      </Card.Section>
    </Card>
  );
};