import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CadastrarDadosMeteorologicos from '../pages/cadastrar-dados/CadastrarDadosMeteorologicos'
import { cadastrarClima } from '../services/climaServices'
import { toast } from 'react-hot-toast'
import { vi } from 'vitest'

vi.mock('../components/headers/NavBar', () => ({
  default: () => <div data-testid="navbar" />,
}))

vi.mock('../components/footers/Footer', () => ({
  default: () => <div data-testid="footer" />,
}))

vi.mock('../services/climaServices', () => ({
  cadastrarClima: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => <div />,
}))

const renderComponent = () => {
  render(<CadastrarDadosMeteorologicos />)
}

const preencherFormularioCompleto = () => {
  fireEvent.change(screen.getByLabelText('Cidade'), {
    target: { value: 'Porto Alegre' },
  })

  fireEvent.change(screen.getByLabelText('Data'), {
    target: { value: '2026-05-05' },
  })

  const selects = screen.getAllByRole('combobox')

  fireEvent.change(selects[0], {
    target: { value: 'Limpo' },
  })

  fireEvent.change(selects[1], {
    target: { value: 'Chuva' },
  })

  fireEvent.change(screen.getByLabelText('Temperatura Máxima'), {
    target: { value: '30' },
  })

  fireEvent.change(screen.getByLabelText('Temperatura Mínima'), {
    target: { value: '20' },
  })

  fireEvent.change(screen.getByLabelText('Precipitação'), {
    target: { value: '10' },
  })

  fireEvent.change(screen.getByLabelText('Humidade'), {
    target: { value: '80' },
  })

  fireEvent.change(screen.getByLabelText('Velocidade do vento'), {
    target: { value: '15' },
  })
}

describe('CadastrarDadosMeteorologicos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar tela de cadastro', () => {
    renderComponent()

    expect(screen.getByText('Cadastro Meteorológico')).toBeInTheDocument()
    expect(screen.getByLabelText('Cidade')).toBeInTheDocument()
  })

  it('deve mostrar erro se tentar salvar vazio', async () => {
    renderComponent()

    fireEvent.click(screen.getByText('Salvar'))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled()
    })
  })

  it('deve preencher formulário e cadastrar com sucesso', async () => {
    ;(cadastrarClima as any).mockResolvedValueOnce({})

    renderComponent()
    preencherFormularioCompleto()

    fireEvent.click(screen.getByText('Salvar'))

    await waitFor(() => {
      expect(cadastrarClima).toHaveBeenCalled()
      expect(toast.success).toHaveBeenCalledWith(
        'Dados cadastrados com sucesso!'
      )
    })
  })

  it('deve mostrar erro se API falhar', async () => {
    ;(cadastrarClima as any).mockRejectedValueOnce(new Error('Erro API'))

    renderComponent()
    preencherFormularioCompleto()

    fireEvent.click(screen.getByText('Salvar'))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Erro ao cadastrar dados'
      )
    })
  })
})