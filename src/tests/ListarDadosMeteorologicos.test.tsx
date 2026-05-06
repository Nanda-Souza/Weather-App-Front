import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListarDadosMeteorologicos from '../pages/listar-dados/ListarDadosMeteorologicos';
import * as climaService from '../services/climaServices';
import { vi } from 'vitest';

// mock das APIs
vi.mock('../services/climaServices');

describe('ListarDadosMeteorologicos', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockDados = [
    {
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
    },
    {
      id: 2,
      cidade: 'Porto Alegre',
      data: '2026-05-04',
      tempoDia: 'CHUVA',
      tempoNoite: 'NUBLADO',
      tempMinima: 12,
      tempMaxima: 18,
      precipitacao: 80,
      humidade: 90,
      velocidadeVento: 10,
    }
  ];

  function renderPage() {
    return render(
      <MemoryRouter>
        <ListarDadosMeteorologicos />
      </MemoryRouter>
    );
  }

  test('deve mostrar loading inicialmente', () => {
    (climaService.buscarClima as any).mockImplementation(
      () => new Promise(() => {})
    );

    renderPage();

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  test('deve listar dados após carregar', async () => {
    (climaService.buscarClima as any).mockResolvedValue(mockDados);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Canoas')).toBeInTheDocument();
    });

    expect(screen.getByText('Porto Alegre')).toBeInTheDocument();
  });

  test('deve buscar por cidade', async () => {
    (climaService.buscarClima as any).mockResolvedValue(mockDados);

    renderPage();

    const input = screen.getByPlaceholderText('Buscar cidade...');
    fireEvent.change(input, { target: { value: 'Canoas' } });

    const botao = screen.getByAltText('buscar');
    fireEvent.click(botao);

    await waitFor(() => {
      expect(climaService.buscarClima).toHaveBeenCalledWith('Canoas');
    });
  });

  test('deve deletar item da lista', async () => {
    (climaService.buscarClima as any).mockResolvedValue(mockDados);
    (climaService.deletarClima as any).mockResolvedValue({});

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Canoas')).toBeInTheDocument();
    });

    const botoesDeletar = screen.getAllByAltText('deletar');
    fireEvent.click(botoesDeletar[0]);

    await waitFor(() => {
      expect(climaService.deletarClima).toHaveBeenCalledWith(1);
    });
    
    await waitFor(() => {
      expect(screen.queryByText('Canoas')).not.toBeInTheDocument();
    });
  });

  test('deve navegar para edição ao clicar no editar', async () => {
    (climaService.buscarClima as any).mockResolvedValue(mockDados);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Canoas')).toBeInTheDocument();
    });

    const botoesEditar = screen.getAllByAltText('editar');
    fireEvent.click(botoesEditar[0]);
    
    expect(botoesEditar[0]).toBeInTheDocument();
  });

});