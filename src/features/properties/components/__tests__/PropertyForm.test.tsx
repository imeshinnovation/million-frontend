import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { PropertyForm } from '../PropertyForm';
import type { CreatePropertyData } from '../../services/propertyService';

// Mock de la función onSubmit
const mockOnSubmit = jest.fn();

// Wrapper para Mantine
const renderWithMantine = (component: React.ReactElement) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('PropertyForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('Debería representar todos los campos del formulario.', () => {
    renderWithMantine(<PropertyForm onSubmit={mockOnSubmit} loading={false} />);
    
    expect(screen.getByLabelText(/nombre de la propiedad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url de la imagen/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear propiedad/i })).toBeInTheDocument();
  });

  it('Debe llamar a onSubmit con datos correctos cuando el formulario sea válido', async () => {
    const user = userEvent.setup();
    renderWithMantine(<PropertyForm onSubmit={mockOnSubmit} loading={false} />);

    const testData: CreatePropertyData = {
      id: '656f81e92f1a4c3a9c2b4876',
      idOwner: '656f81e92f1a4c3a9c2b4678',
      name: 'Casa de Prueba',
      addressProperty: 'Calle 123, Ciudad Test',
      priceProperty: 500000000,
      imageUrl: 'https://example.com/image.jpg',
    };

    // Llenar los campos de texto
    await user.type(screen.getByLabelText(/nombre de la propiedad/i), testData.name);
    await user.type(screen.getByLabelText(/dirección/i), testData.addressProperty);
    await user.type(screen.getByLabelText(/url de la imagen/i), testData.imageUrl);

    // Para el NumberInput, usar clear y type
    const priceInput = screen.getByLabelText(/precio/i);
    await user.clear(priceInput);
    await user.type(priceInput, testData.priceProperty.toString());

    await user.click(screen.getByRole('button', { name: /crear propiedad/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    // Verificar que se llamó con los datos correctos (ignorando el evento)
    const submittedCall = mockOnSubmit.mock.calls[0];
    const submittedData = submittedCall[0]; // Primer argumento
    
    // Verificar cada propiedad individualmente
    expect(submittedData.name).toBe(testData.name);
    expect(submittedData.addressProperty).toBe(testData.addressProperty);
    expect(submittedData.imageUrl).toBe(testData.imageUrl);
    expect(submittedData.idOwner).toBe(testData.idOwner);
    // Para priceProperty, convertir a número por si acaso
    expect(Number(submittedData.priceProperty)).toBe(testData.priceProperty);
  });

  it('Debería mostrar errores de validación para campos no válidos.', async () => {
    const user = userEvent.setup();
    renderWithMantine(<PropertyForm onSubmit={mockOnSubmit} loading={false} />);
    
    // Llenar con datos inválidos
    await user.type(screen.getByLabelText(/nombre de la propiedad/i), 'Ca'); // Muy corto
    await user.type(screen.getByLabelText(/dirección/i), '123'); // Muy corto
    
    const priceInput = screen.getByLabelText(/precio/i);
    await user.clear(priceInput);
    await user.type(priceInput, '50000'); // Muy bajo
    
    await user.type(screen.getByLabelText(/url de la imagen/i), 'invalid-url'); // URL inválida

    // Intentar enviar el formulario
    await user.click(screen.getByRole('button', { name: /crear propiedad/i }));

    // Esperar a que aparezcan los mensajes de error
    await waitFor(() => {
      expect(screen.getByText(/el nombre debe tener al menos 3 caracteres/i)).toBeInTheDocument();
      expect(screen.getByText(/la dirección es muy corta/i)).toBeInTheDocument();
      expect(screen.getByText(/el precio mínimo es de \$100\.000/i)).toBeInTheDocument();
      expect(screen.getByText(/ingrese una url válida/i)).toBeInTheDocument();
    });

    // Asegurarse de que no se llamó a onSubmit
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('Debería desactivar el botón al cargar', () => {
    renderWithMantine(<PropertyForm onSubmit={mockOnSubmit} loading={true} />);
    
    const button = screen.getByRole('button', { name: /crear propiedad/i });
    expect(button).toBeDisabled();
  });

  it('Debería habilitar el botón cuando no esté cargando', () => {
    renderWithMantine(<PropertyForm onSubmit={mockOnSubmit} loading={false} />);
    
    const button = screen.getByRole('button', { name: /crear propiedad/i });
    expect(button).toBeEnabled();
  });

  it('Debe gestionar el envío del formulario con datos válidos', async () => {
    const user = userEvent.setup();
    renderWithMantine(<PropertyForm onSubmit={mockOnSubmit} loading={false} />);

    // Datos válidos
    const validData: CreatePropertyData = {
      id: '656f81e92f1a4c3a9c2b4876',
      idOwner: '656f81e92f1a4c3a9c2b4678',
      name: 'Hermosa Casa Familiar',
      addressProperty: 'Avenida Principal 456, Bogotá',
      priceProperty: 350000000,
      imageUrl: 'https://example.com/casa-familiar.jpg',
    };

    // Llenar el formulario con datos válidos
    await user.type(screen.getByLabelText(/nombre de la propiedad/i), validData.name);
    await user.type(screen.getByLabelText(/dirección/i), validData.addressProperty);
    
    const priceInput = screen.getByLabelText(/precio/i);
    await user.clear(priceInput);
    await user.type(priceInput, validData.priceProperty.toString());
    
    await user.type(screen.getByLabelText(/url de la imagen/i), validData.imageUrl);

    // Enviar formulario
    await user.click(screen.getByRole('button', { name: /crear propiedad/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    // Verificar los datos enviados
    const submittedCall = mockOnSubmit.mock.calls[0];
    const submittedData = submittedCall[0];
    
    expect(submittedData.name).toBe(validData.name);
    expect(submittedData.addressProperty).toBe(validData.addressProperty);
    expect(submittedData.imageUrl).toBe(validData.imageUrl);
    expect(submittedData.idOwner).toBe(validData.idOwner);
    expect(Number(submittedData.priceProperty)).toBe(validData.priceProperty);
  });

  it('Debe mostrar la descripción del precio formateada', async () => {
    const user = userEvent.setup();
    renderWithMantine(<PropertyForm onSubmit={mockOnSubmit} loading={false} />);

    const priceInput = screen.getByLabelText(/precio/i);
    await user.clear(priceInput);
    await user.type(priceInput, '500000000');

    // Verificar que aparece el precio formateado
    await waitFor(() => {
      expect(screen.getByText(/Formateado: \$500,000,000/)).toBeInTheDocument();
    });
  });
});