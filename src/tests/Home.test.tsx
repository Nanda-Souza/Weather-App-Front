import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/home/Home';
import * as climaService from '../services/climaServices';
import { vi } from 'vitest';

vi.mock('../services/climaServices');

describe('Home', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('deve mostrar mensagem inicial', () => {
    render(
    <MemoryRouter>
        <Home />
    </MemoryRouter>
    );

    expect(
      screen.getByText('Busque por uma cidade para exibir os dados!')
    ).toBeInTheDocument();
  });

  test('deve buscar clima e exibir dados', async () => {
    const mockHoje = {
      id: 1,
      cidade: 'Canoas',
      data: '2026-05-05',
      tempoDia: 'LIMPO',
      tempoNoite: 'NUBLADO',
      tempMinima: 10,
      tempMaxima: 20,
      precipitacao: 5,
      humidade: 70,
      velocidadeVento: 15,
    };

    const mock7Dias = [
      {
        ...mockHoje,
        id: 2,
        data: '2026-05-06',
      },
    ];

    (climaService.buscarClimaHoje as any).mockResolvedValue(mockHoje);
    (climaService.buscarClima7Dias as any).mockResolvedValue(mock7Dias);

    render(
    <MemoryRouter>
        <Home />
    </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Canoas' } });

    const botao = screen.getByAltText('buscar');
    fireEvent.click(botao);

    await waitFor(() => {
      expect(screen.getByText('20°')).toBeInTheDocument();
    });

    expect(screen.getByText('70%')).toBeInTheDocument();
    expect(screen.getByText('15 km/h')).toBeInTheDocument();
  });

  test('deve mostrar loading', async () => {
    (climaService.buscarClimaHoje as any).mockImplementation(
      () => new Promise(() => {})
    );

    render(
    <MemoryRouter>
        <Home />
    </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Canoas' } });

    const botao = screen.getByAltText('buscar');
    fireEvent.click(botao);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  test('deve tratar erro da API', async () => {
    (climaService.buscarClimaHoje as any).mockRejectedValue(new Error());

    render(
    <MemoryRouter>
        <Home />
    </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Canoas' } });

    const botao = screen.getByAltText('buscar');
    fireEvent.click(botao);

    await waitFor(() => {
      expect(
        screen.getByText('Nenhum dado meteorológico cadastrado!')
      ).toBeInTheDocument();
    });
  });

});