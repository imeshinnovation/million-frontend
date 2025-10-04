import { useState } from 'react';
import { Title, Alert } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PropertyForm } from '../features/properties/components/PropertyForm';
import type { CreatePropertyData } from '../features/properties/services/propertyService';
import type { ServiceError } from '../features/properties/types/property.types';
import { propertyService } from '../features/properties/services/propertyService';

export const CreatePropertyPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCreateProperty = async (values: CreatePropertyData) => {
        setLoading(true);
        setError(null);
        try {
            await propertyService.createProperty(values);
            notifications.show({
                title: 'Éxito',
                message: 'La propiedad fue creada correctamente.',
                color: 'green',
            });
            navigate('/');
        } catch (err: ServiceError | Error | unknown) {
            const message = (err as ServiceError)?.message || 
                           (err as Error)?.message || 'Ocurrió un error al crear la propiedad.';
            setError(message);
            notifications.show({
                title: 'Error',
                message: 'No se pudo crear la propiedad.',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className='Header'>
                <Title order={2} pe="lg" mb="lg">Crear Nueva Propiedad</Title>
                {error && <Alert color="red" mb="md">{error}</Alert>}
                <PropertyForm onSubmit={handleCreateProperty} loading={loading} />
            </div>
        </Layout>
    );
};