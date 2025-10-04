import { TextInput, NumberInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CreatePropertyData } from '../services/propertyService';

interface PropertyFormProps {
    onSubmit: (values: CreatePropertyData) => void;
    loading: boolean;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit, loading }) => {
    const form = useForm<CreatePropertyData>({
        initialValues: {
            id: '656f81e92f1a4c3a9c2b4876',
            idOwner: '656f81e92f1a4c3a9c2b4678',
            name: '',
            addressProperty: '',
            priceProperty: 0,
            imageUrl: '',
        },
        validate: {
            name: (value) => value.trim().length < 3 ? 'El nombre debe tener al menos 3 caracteres' : null,
            addressProperty: (value) => value.trim().length < 5 ? 'La dirección es muy corta' : null,
            priceProperty: (value) => value < 100000 ? 'El precio mínimo es de $100.000' : null,
            imageUrl: (value) => !/^https?:\/\/.+/.test(value) ? 'Ingrese una URL válida' : null,
        },
    });

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit(onSubmit)}>
                <TextInput
                    withAsterisk
                    label="Nombre de la Propiedad"
                    placeholder="Ej: Apartamento en el centro"
                    {...form.getInputProps('name')}
                />
                <TextInput
                    withAsterisk
                    label="Dirección"
                    placeholder="Ej: Calle 57 # 45-22"
                    mt="md"
                    {...form.getInputProps('addressProperty')}
                />
                <NumberInput
                    withAsterisk
                    label="Precio"
                    placeholder="Precio en COP"
                    mt="md"
                    min={0}
                    step={100000}
                    {...form.getInputProps('priceProperty')}
                    description={
                        form.values.priceProperty > 0
                            ? `Formateado: $${form.values.priceProperty.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                            : 'Precio mínimo: $100,000'
                    }
                />
                <TextInput
                    withAsterisk
                    label="URL de la Imagen"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    mt="md"
                    {...form.getInputProps('imageUrl')}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit" loading={loading}>
                        Crear Propiedad
                    </Button>
                </Group>
            </form>
        </Box>
    );
};