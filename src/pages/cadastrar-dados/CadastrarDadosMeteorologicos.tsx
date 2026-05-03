import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Footer from "../../components/footers/Footer";
import NavBar from "../../components/headers/NavBar";
import { cadastrarClima } from '../../services/climaServices';


const climaDiurno = ['Limpo', 'Nuvens', 'Chuva', 'Nublado', 'Tempestade']
const climaNoturno = ['Chuva', 'Nublado', 'Tempestade']

export default function CadastrarDadosMeteorologicos(){   

  const [form, setForm] = useState({
  cidade: '',
  data: '',
  tempoDia: '',
  tempoNoite: '',
  turnoDia: 'Dia',
  turnoNoite: 'Noite',
  tempMaxima: '',
  tempMinima: '',
  precipitacao: '',
  humidade: '',
  velocidadeVento: '',
  });

  const camposObrigatorios = [
  { campo: form.cidade, mensagem: 'Cidade é obrigatória' },
  { campo: form.data, mensagem: 'Data é obrigatória' },
  { campo: form.tempoDia, mensagem: 'Tempo do dia é obrigatório' },
  { campo: form.tempoNoite, mensagem: 'Tempo da noite é obrigatório' },
  { campo: form.tempMaxima, mensagem: 'Temperatura máxima é obrigatória' },
  { campo: form.tempMinima, mensagem: 'Temperatura mínima é obrigatória' },
  { campo: form.precipitacao, mensagem: 'Precipitação é obrigatória' },
  { campo: form.humidade, mensagem: 'Humidade é obrigatória' },
  { campo: form.velocidadeVento, mensagem: 'Velocidade do vento é obrigatória' },
];

  const cadastrarDados = async () => {
    for (const item of camposObrigatorios) {
      if (!item.campo) {
        toast.error(item.mensagem);
        return;
      }
    }

    const payload = {
    cidade: form.cidade,
    data: form.data,
    tempoDia: form.tempoDia.toUpperCase(),
    tempoNoite: form.tempoNoite.toUpperCase(),
    tempMinima: Number(form.tempMinima),
    tempMaxima: Number(form.tempMaxima),
    precipitacao: Number(form.precipitacao),
    humidade: Number(form.humidade),
    velocidadeVento: Number(form.velocidadeVento),
  };

    try {
      await cadastrarClima(payload);
      toast.success('Dados cadastrados com sucesso!');
    } catch (error: any) {
      console.log(error.response)
      toast.error('Erro ao cadastrar dados');
    }
  };

    return(
        <div className="container">
        <Toaster 
          position="top-right"
            toastOptions={{
            style: {
              background: '#2a0f4d',
              color: '#fff',
            },
          }} 
        />
        <NavBar tela="cadastrar" />
        <div className="title">Cadastro Meteorológico</div>

        <div className="form-grid">
            <div className="input-group">
                <label>Cidade</label>
                <input
                  className="input"
                  value={form.cidade}
                  onChange={(e) =>
                    setForm({ ...form, cidade: e.target.value })
                  }
                />
            </div>

            <div className="input-group">
                <label>Data</label>
                <input
                  className="input"
                  type="date"
                  value={form.data}
                  onChange={(e) =>
                    setForm({ ...form, data: e.target.value })
                  }
                />
            </div>
        </div>

        <div className="card">
        
        <div className="row">
          <div className="input-group w-tempo">
            <label>Tempo</label>
              <select
                  className="input"
                  value={form.tempoDia}
                  onChange={(e) =>
                    setForm({ ...form, tempoDia: e.target.value })
                  }                  
                  >
                  <option value="" disabled hidden>
                    Selecione
                  </option>

                  {climaDiurno.map((tempo) => (
                    <option key={tempo} value={tempo}>
                      {tempo}
                    </option>
                  ))}
              </select>
            </div>

          <div className="input-group w-turno">
            <input className="input" defaultValue="Dia" readOnly/>
          </div>

          <div className="input-group w-small">
            <label>Temperatura Máxima</label>
            <input
              className="input"
              type="number"
              value={form.tempMaxima}
              onChange={(e) =>
                setForm({ ...form, tempMaxima: e.target.value })
              }
            />
          </div>

          <div className="input-group w-small">
            <label>Temperatura Mínima</label>
            <input
              className="input"
              type="number"
              value={form.tempMinima}
              onChange={(e) =>
                setForm({ ...form, tempMinima: e.target.value })
              }
            />
          </div>
        </div>
        
        <div className="row">
          <div className="input-group w-tempo">
                <select
                  className="input"
                  value={form.tempoNoite}
                  onChange={(e) =>
                    setForm({ ...form, tempoNoite: e.target.value })
                  }
                  >
                  <option value="" disabled hidden>
                    Selecione
                  </option>

                  {climaNoturno.map((tempo) => (
                    <option key={tempo} value={tempo}>
                      {tempo}
                    </option>
                  ))}
              </select>
          </div>

          <div className="input-group w-turno">
            <input className="input" defaultValue="Noite" readOnly/>
          </div>

          <div className="input-group w-small">
            <label>Precipitação</label>
            <input
              className="input"
              type="text"
              inputMode="numeric"
              value={form.precipitacao ? `${form.precipitacao}%` : ''}
              onChange={(e) => {
                let v = e.target.value;
                v = v.replace(/\D/g, '');

                setForm({ ...form, precipitacao: v });
              }}
            />
          </div>

          <div className="input-group w-small">
            <label>Humidade</label>
            <input
              className="input"
              type="text"
              inputMode="numeric"
              value={form.humidade ? `${form.humidade}%` : ''}
              onChange={(e) => {
                let v = e.target.value;                
                v = v.replace(/\D/g, '');                
                setForm({ ...form, humidade: v });
              }}
            />
          </div>

          <div className="input-group w-medium">
            <label>Velocidade do vento</label>
            <input
              className="input"
              type="text"
              inputMode="numeric"
              value={form.velocidadeVento ? `${form.velocidadeVento}%` : ''}              
              onChange={(e) => {
                let v = e.target.value;                
                v = v.replace(/\D/g, '');                
                setForm({ ...form, velocidadeVento: v });
              }}
            />
          </div>
        </div>

      </div>
      
      <div className="actions">
        <button className="button cancel">Cancelar</button>
        <button className="button save" onClick={cadastrarDados}>
          Salvar
        </button>
      </div>
      <Footer />
    </div>
    );
}