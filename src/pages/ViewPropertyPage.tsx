import { Container, Title, Text, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { Layout } from '../components/Layout';
import { useLocation } from "react-router-dom";


export const ViewPropertyPage = () => {

  const location = useLocation();
  const property = location.state;

  if (!property) {
    return (
      <Container size="lg" py="xl">
        <Alert icon={<IconAlertCircle size="1rem" />} title="No encontrado" color="yellow">
          La propiedad solicitada no existe.
        </Alert>
      </Container>
    );
  }

  return (
    <Layout>
      <div className='Header'>
        <img
          src={property.imageUrl}
          alt={property.name}
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '20px'
          }}
        />

        <Title order={2} pe="lg" mb="lg">Información de la Propiedad</Title>

        <Text size="lg" mb="xs">
          {property.name}
        </Text>

        <Text size="lg" mb="xs">
          <strong>Dirección:</strong> {property.addressProperty}
        </Text>

        <Text size="lg" mb="xs" c="blue">
          <strong>Precio:</strong> ${property.priceProperty.toLocaleString()}
        </Text>
      </div>
    </Layout>
  );
};