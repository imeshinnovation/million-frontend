import { useEffect, useMemo, useCallback } from 'react';
import { TextInput, RangeSlider, Box, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks'; // ¡Importante!
import type { PropertyFilters } from '../types/property.types';
import { useWindowSize } from '../hooks/useWindowSize';

interface PropertyFiltersProps {
  onFiltersChange: (filters: PropertyFilters) => void;
}

export const PropertyFilter: React.FC<PropertyFiltersProps> = ({ onFiltersChange }) => {
  const { width } = useWindowSize();

  const form = useForm<PropertyFilters>({
    initialValues: {
      name: '',
      address: '',
      minPrice: 100000,
      maxPrice: 5000000000,
    },
  });

  const [debouncedValues] = useDebouncedValue(form.values, 800);

  const marks = useMemo(() => {
    return width > 1024 ? [
      { value: 50000000, label: '$50M' },
      { value: 500000000, label: '$500M' },
      { value: 1000000000, label: '$1000M' },
      { value: 1500000000, label: '$1500M' },
      { value: 2000000000, label: '$2000M' },
      { value: 2500000000, label: '$2500M' },
      { value: 3000000000, label: '$3000M' },
      { value: 3500000000, label: '$3500M' },
      { value: 4000000000, label: '$4000M' },
      { value: 4500000000, label: '$4500M' },
      { value: 5000000000, label: '$5000M' },
    ] : [
      { value: 50000000, label: '$50M' },
      { value: 2500000000, label: '$2500M' },
      { value: 5000000000, label: '$5000M' },
    ];
  }, [width]);

  const handleRangeChange = useCallback((value: [number, number]) => {
    form.setValues({ minPrice: value[0], maxPrice: value[1] });
  }, [form]);

  useEffect(() => {
    if (Object.keys(debouncedValues).length > 0) {
      onFiltersChange(debouncedValues);
    }
  }, [debouncedValues, onFiltersChange]);

  return (
    <Box mb={30} p={10}>
      <TextInput
        label="Buscar por Nombre"
        placeholder="Ej: Apartamento en la Calera"
        {...form.getInputProps('name')}
      />
      <TextInput
        label="Buscar por Dirección"
        placeholder="Ej: Calle 1 # 12-34"
        mt="md"
        {...form.getInputProps('address')}
      />

      <Text size="sm" mt="lg">
                Buscar por precio
              </Text>
      <RangeSlider
        mt={50}
        me={0}
        ms={0}
        label={(value) => `$${(value / 1000000).toFixed(0)}M`}
        min={50000000}
        max={5000000000}
        step={10000000}
        minRange={10000000}
        labelAlwaysOn
        value={[form.values.minPrice, form.values.maxPrice]}
        onChange={handleRangeChange}
        marks={marks}
        styles={{
          markWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
          mark: {
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            marginTop: '30px',
            fontSize: '10px',
          },
          markLabel: {
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            fontSize: '10px',
            marginTop: '5px',
            textAlign: 'center',
          },
          root: {
            position: 'relative',
            overflow: 'visible',
          },
          bar: {
            overflow: 'hidden',
          },
        }}
      />
    </Box>
  );
};