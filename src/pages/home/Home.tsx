import { useState } from "react";
import Footer from "../../components/footers/Footer";
import NavBar from "../../components/headers/NavBar";
import { buscarClimaHoje } from "../../services/climaServices";
import './Home.css'
import precipitacaoIcon from '../../assets/precipitacao.png';
import humidadeIcon from '../../assets/humidade.png';
import ventoIcon from '../../assets/velocidade.png';
import chuvaDia from '../../assets/chuvaDia.png';
import chuvaNoite from '../../assets/chuvaNoite.png';
import limpo from '../../assets/limpo.png';
import nubladoDia from '../../assets/nubladoDia.png';
import nubladoNoite from '../../assets/nubladoNoite.png';
import nuvens from '../../assets/nuvens.png';
import tempestade from '../../assets/tempestade.png';

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

  function turnoDia() {
    const hora = new Date().getHours();
    return hora >= 6 && hora <= 18;
    }

    function pegarIconePorTurno(dados: Clima) {
    const dia = turnoDia();

    if (dia) {
        switch (dados.tempoDia) {
        case 'LIMPO':
            return limpo;
        case 'NUVENS':
            return nuvens;
        case 'CHUVA':
            return chuvaDia;
        case 'NUBLADO':
            return nubladoDia;
        case 'TEMPESTADE':
            return tempestade;
        default:
            return limpo;
        }
    } else {
        switch (dados.tempoNoite) {
        case 'CHUVA':
            return chuvaNoite;
        case 'NUBLADO':
            return nubladoNoite;
        case 'TEMPESTADE':
            return tempestade;
        default:
            return limpo;
        }
    }
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
            {!buscou ? (
                <div className="no-items">
                Busque por uma cidade para exibir os dados!
                </div>
            ) : loading ? (
                <div className="no-items">Carregando...</div>
            ) : !dados ? (
                <div className="no-items">
                Nenhum dado meteorológico cadastrado!
                </div>
            ) : (
                <div className="weather-card">
                
                <div className="weather-left">
                    <img src={pegarIconePorTurno(dados)} alt="clima" className="weather-icon" />

                    <div className="temp">
                    <span className="max">{dados.tempMaxima}°</span>
                    <span className="min">/{dados.tempMinima}°</span>
                    </div>
                </div>
                
                <div className="weather-right">

                    <div className="weather-item">
                    <img src={precipitacaoIcon} />
                    <span>{dados.precipitacao}%</span>
                    <small>Precipitação</small>
                    </div>

                    <div className="weather-item">
                    <img src={humidadeIcon} />
                    <span>{dados.humidade}%</span>
                    <small>Humidade</small>
                    </div>

                    <div className="weather-item">
                    <img src={ventoIcon} />
                    <span>{dados.velocidadeVento} km/h</span>
                    <small>Velocidade vento</small>
                    </div>

                </div>

                </div>
            )}
        </div>

      <Footer />
    </div>
  );
}