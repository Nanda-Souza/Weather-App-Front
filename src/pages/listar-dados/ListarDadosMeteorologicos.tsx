import './ListarDadosMeteorologicos.css'
import Footer from "../../components/footers/Footer";
import NavBar from "../../components/headers/NavBar";

const dadosMock = [
  { cidade: "Porto Alegre", data: "31/03/2023" },
  { cidade: "Gramado", data: "31/03/2023" },
  { cidade: "Los Angeles", data: "28/03/2023" },
  { cidade: "Porto Alegre", data: "31/03/2023" },
  { cidade: "Gramado", data: "31/03/2023" },
  { cidade: "Los Angeles", data: "28/03/2023" },
];

export default function ListarDadosMeteorologicos(){

    return(
<div className="container">
      <NavBar tela="listar" />

      <div className="title">Lista de cidades</div>
      
      <div className="form-grid">
        <div className="input-group">
          <label>Cidade</label>
            <div className="input-with-icon">
                <input className="input" placeholder="Porto Alegre" />
                <span className="search-icon">🔍</span>
            </div>
        </div>
      </div>

      
      <div className="card">
        
        <div className="row header">
          <div className="col cidade">Cidade</div>
          <div className="col data">Data</div>
          <div className="col acao">Ação</div>
        </div>

        
        {dadosMock.map((item, index) => (
          <div className="row item" key={index}>
            <div className="col cidade">{item.cidade}</div>
            <div className="col data">{item.data}</div>
            <div className="col acao">
              <span className="icon">✏️</span>
              <span className="icon">🗑️</span>
            </div>
          </div>
        ))}
      </div>

      
      <div className="pagination">
        &lt; Página 2 de 10 &gt;
      </div>

      <Footer />
    </div>
    );
}