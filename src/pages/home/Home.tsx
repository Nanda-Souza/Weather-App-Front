import { useState } from "react";
import Footer from "../../components/footers/Footer";
import NavBar from "../../components/headers/NavBar";
import { buscarClimaHoje } from "../../services/climaServices";
import './Home.css'

interface Clima {
  id: number;
  cidade: string;
  data: string;
}

export default function Home() {
  const [cidade, setCidade] = useState("");
  const [dados, setDados] = useState<Clima | null>(null);
  const [loading, setLoading] = useState(false);
  const [buscou, setBuscou] = useState(false);

  async function buscarClima() {
    if (!cidade.trim()) return;

    try {
      setLoading(true);
      setBuscou(true);

      const response = await buscarClimaHoje(cidade);      
      setDados(response);
    } catch (error) {
      setDados(null);
    } finally {
      setLoading(false);
    }
  }

  function climaHoje() {
    if (!buscou) return "Busque por uma cidade para exibir os dados!";
    if (loading) return "Carregando...";
    if (dados) return "Encontrou Dados!";
    return "Nenhum dado meteorológico cadastrado!";
  }

  return (
    <div className="container">
      <NavBar tela="home" />

      <div className="top-bar">
        <div className="title">Hoje</div>

        <div className="input-group">
          <label>Pesquise a Cidade</label>
          <div className="input-with-icon">
            <input
              className="input"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <span className="search-icon" onClick={buscarClima}>
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

        <div className="no-items">
          {climaHoje()}
        </div>
      </div>

      <Footer />
    </div>
  );
}