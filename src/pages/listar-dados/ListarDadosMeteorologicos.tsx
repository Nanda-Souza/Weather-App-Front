import { useEffect, useState } from "react";
import './ListarDadosMeteorologicos.css'
import Footer from "../../components/footers/Footer";
import NavBar from "../../components/headers/NavBar";
import { buscarClima } from "../../services/climaServices";

interface Clima {
  id: number;
  cidade: string;
  data: string;
  tempoDia: string;
  tempoNoite: string;
  tempMinima: number;
  tempMaxima: number;
  precipitacao: number;
  humidade: number;
  velocidadeVento: number;
}

export default function ListarDadosMeteorologicos(){    
    const [dados, setDados] = useState<Clima[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagina, setPagina] = useState(1);
    const [cidade, setCidade] = useState("");    
    const itensPorPagina = 10;

    async function carregarDados(cidadeBusca?: string) {
    try {
      setLoading(true);
      const response = await buscarClima(cidadeBusca?.trim() || undefined);
      
      setDados(response);
      setPagina(1);
    } catch (error: any) {
      console.error(error.response);      
      setDados([]);
    } finally {
      setLoading(false);
    }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    const dadosFiltrados = dados
    .sort((a, b) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
    });

    const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);

    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;

    const dadosPaginados = dadosFiltrados.slice(inicio, fim);

    return(
      <div className="container">      
      <NavBar tela="listar" />

      <div className="title">Lista de cidades</div>
      
      <div className="form-grid">
        <div className="input-group">
          <label>Cidade</label>
            <div className="input-with-icon">
                <input
                    className="input"
                    placeholder="Buscar cidade..."
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                />
                <span
                    className="search-icon"
                    onClick={() => carregarDados(cidade)}
                    >
                    🔍
                </span>
            </div>
        </div>
      </div>

      
      <div className="card">
        
        <div className="row header">
          <div className="col cidade">Cidade</div>
          <div className="col data">Data</div>
          <div className="col acao">Ação</div>
        </div>

        
        {loading ? (
          <div className="item">Carregando...</div>
        ) : dadosFiltrados.length === 0 ? (
          <div className="no-items">
            Nenhum dado meteorológico cadastrado!
          </div>
        ) : (
          dadosPaginados.map((item) => (
            <div className="row item" key={item.id}>
              <div className="col cidade">{item.cidade}</div>
              <div className="col data">
                {item.data.split('-').reverse().join('/')}
              </div>
              <div className="col acao">
                <span className="icon">✏️</span>
                <span className="icon">🗑️</span>
              </div>
            </div>
          ))
        )}
      </div>      
      
      {!loading && dadosFiltrados.length > 0 && (
        <div className="pagination">
          <button
            disabled={pagina === 1}
            onClick={() => setPagina((p) => p - 1)}
          >
            &lt;
          </button>

          <span>
            Página {pagina} de {totalPaginas}
          </span>

          <button
            disabled={pagina === totalPaginas}
            onClick={() => setPagina((p) => p + 1)}
          >
            &gt;
          </button>
        </div>
      )}

      <Footer />
    </div>
    );
}