import { useState } from "react";
import Footer from "../../components/footers/Footer";
import NavBar from "../../components/headers/NavBar";
import './Home.css'

export default function Home() {
  const [cidade, setCidade] = useState("");

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
                <span className="search-icon">🔍</span>
                </div>
            </div>
        </div>

      {/* CARD */}
      <div className="card">
        <div className="row header">
          <div className="col cidade">Cidade</div>
          <div className="col data">Data</div>
          <div className="col acao">Ação</div>
        </div>
        
        <div className="no-items">
          Busque por uma cidade para exibir os dados!
        </div>
      </div>

      <Footer />
    </div>
  );
}