import Footer from "../../components/footers/Footer";
import NavBar from "../../components/headers/NavBar";
Footer

NavBar
export default function CadastrarDadosMeteorologicos(){
    return(
        <div className="container">
        <NavBar tela="cadastrar" />
        <div className="title">Cadastro Meteorológico</div>

        <div className="form-grid">
            <div className="input-group">
                <label>Cidade</label>
                <input className="input" defaultValue="Porto Alegre" />
            </div>

            <div className="input-group">
                <label>Data</label>
                <input className="input" type="date" defaultValue="2023-03-31" />
            </div>
        </div>

        <div className="card">
        
        <div className="row">
          <div className="input-group w-tempo">
            <label>Tempo</label>
            <input className="input" defaultValue="Limpo" />
          </div>

          <div className="input-group w-turno">
            <label>Turno</label>
            <input className="input" defaultValue="Manhã" />
          </div>

          <div className="input-group w-small">
            <label>Temperatura Máxima</label>
            <input className="input" defaultValue="31" />
          </div>

          <div className="input-group w-small">
            <label>Temperatura Mínima</label>
            <input className="input" defaultValue="18" />
          </div>
        </div>
        
        <div className="row">
          <div className="input-group w-tempo">
            <input className="input" defaultValue="Tempestade" />
          </div>

          <div className="input-group w-turno">
            <input className="input" defaultValue="Noite" />
          </div>

          <div className="input-group w-small">
            <label>Precipitação</label>
            <input className="input" defaultValue="10%" />
          </div>

          <div className="input-group w-small">
            <label>Humidade</label>
            <input className="input" defaultValue="30%" />
          </div>

          <div className="input-group w-medium">
            <label>Velocidade do vento</label>
            <input className="input" defaultValue="30%" />
          </div>
        </div>

      </div>
      
      <div className="actions">
        <button className="button cancel">Cancelar</button>
        <button className="button save">Salvar</button>
      </div>
      <Footer />
    </div>
    );
}