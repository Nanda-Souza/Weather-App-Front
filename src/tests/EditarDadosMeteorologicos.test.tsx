import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import EditarDadosMeteorologico from '../pages/editar-dados/EditarDadosMeteorologicos'
import * as climaService from '../services/climaServices'
import { toast } from 'react-hot-toast'

// mocks
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
  useNavigate: () => vi.fn(),
}))

vi.mock('../components/headers/NavBar', () => ({
  default: () => <div data-testid="navbar" />,
}))

vi.mock('../components/footers/Footer', () => ({
  default: () => <div data-testid="footer" />,
}))

vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => <div />,
}))

describe('EditarDadosMeteorologico', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockDados = {
    cidade: 'Porto Alegre',
    data: '2026-05-05',
    tempoDia: 'Limpo',
    tempoNoite: 'Chuva',
    tempMaxima: 30,
    tempMinima: 20,
    precipitacao: 50,
    humidade: 80,
    velocidadeVento: 10,
  }

  it('deve carregar dados ao iniciar', async () => {
    vi.spyOn(climaService, 'buscarClimaPorId').mockResolvedValue(mockDados as any)

    render(<EditarDadosMeteorologico />)

    await waitFor(() => {
      expect(screen.getByDisplayValue('Porto Alegre')).toBeInTheDocument()
      expect(screen.getByDisplayValue('2026-05-05')).toBeInTheDocument()
    })
  })

  it('deve editar com sucesso', async () => {
    vi.spyOn(climaService, 'buscarClimaPorId').mockResolvedValue(mockDados as any)
    vi.spyOn(climaService, 'editarClima').mockResolvedValue({} as any)

    render(<EditarDadosMeteorologico />)

    // espera carregar
    await waitFor(() => {
      expect(screen.getByDisplayValue('Porto Alegre')).toBeInTheDocument()
    })

    // altera cidade
    fireEvent.change(screen.getByDisplayValue('Porto Alegre'), {
      target: { value: 'São Paulo' },
    })

    // salva
    fireEvent.click(screen.getByText('Salvar'))

    await waitFor(() => {
      expect(climaService.editarClima).toHaveBeenCalled()
      expect(toast.success).toHaveBeenCalledWith(
        'Dados atualizados com sucesso!'
      )
    })
  })

  it('deve mostrar erro se API falhar', async () => {
    vi.spyOn(climaService, 'buscarClimaPorId').mockResolvedValue(mockDados as any)
    vi.spyOn(climaService, 'editarClima').mockRejectedValue(new Error())

    render(<EditarDadosMeteorologico />)

    await waitFor(() => {
      expect(screen.getByDisplayValue('Porto Alegre')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Salvar'))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Erro ao atualizar dados'
      )
    })
  })

  it('deve mostrar erro se campos obrigatórios não preenchidos', async () => {
    vi.spyOn(climaService, 'buscarClimaPorId').mockResolvedValue(mockDados as any)

    render(<EditarDadosMeteorologico />)

    await waitFor(() => {
      expect(screen.getByDisplayValue('Porto Alegre')).toBeInTheDocument()
    })

    // limpa campo obrigatório
    fireEvent.change(screen.getByDisplayValue('Porto Alegre'), {
      target: { value: '' },
    })

    fireEvent.click(screen.getByText('Salvar'))

    expect(toast.error).toHaveBeenCalledWith('Cidade é obrigatória')
  })
})