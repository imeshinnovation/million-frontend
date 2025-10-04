import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { PropertyCard } from '../PropertyCard';
import type { Property } from '../../types/property.types';
import { MantineProvider } from '@mantine/core';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('PropertyCard Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  const mockProperty: Property = {
    id: '1',
    idOwner: '6cdf0923458f06978eed0',
    name: 'Casa Bonita',
    imageUrl: 'https://example.com/casa.jpg',
    addressProperty: 'Calle Falsa 123',
    priceProperty: 250000,
  };

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <MantineProvider>
        <MemoryRouter>{ui}</MemoryRouter>
      </MantineProvider>
    );
  };

  it('renderiza correctamente el nombre de la propiedad', () => {
    renderWithProviders(<PropertyCard property={mockProperty} />);
    expect(screen.getByText(/Casa Bonita/i)).toBeInTheDocument();
  });

  it('muestra la dirección correctamente', () => {
    renderWithProviders(<PropertyCard property={mockProperty} />);
    expect(screen.getByText(/Dirección: Calle Falsa 123/i)).toBeInTheDocument();
  });

  it('muestra el precio formateado correctamente', () => {
    renderWithProviders(<PropertyCard property={mockProperty} />);
    const priceText = screen.getByText(/Precio:/i);
    expect(priceText.textContent).toMatch(/250/);
  });

  it('muestra la imagen con el alt correcto', () => {
    renderWithProviders(<PropertyCard property={mockProperty} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockProperty.imageUrl);
    expect(img).toHaveAttribute('alt', mockProperty.name);
  });

  it('navega al hacer click en la tarjeta', () => {
    renderWithProviders(<PropertyCard property={mockProperty} />);
    const card = screen.getByTestId('property-card-1');
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith('/viewproperty', { state: mockProperty });
  });

  it('muestra un badge de Venta', () => {
    renderWithProviders(<PropertyCard property={mockProperty} />);
    expect(screen.getByText(/Venta/i)).toBeInTheDocument();
  });
});
