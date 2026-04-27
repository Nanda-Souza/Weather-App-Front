import './NavBar.css'
import { useNavigate } from 'react-router-dom';

type NavBarProps = {
  tela: 'home' | 'cadastrar' | 'listar';
};

export default function NavBar({tela}: NavBarProps){
  const navigate = useNavigate();

    return(
      <div className="navbar">
        <span
          onClick={() => navigate('/home')}
          className={tela === 'home' ? 'active' : ''}
        >
          Home
        </span>
      
        <span
          onClick={() => navigate('/cadastrar-dados')}
          className={tela === 'cadastrar' ? 'active' : ''}
        >
          Cadastrar
        </span>
        
        <span
          onClick={() => navigate('/listar-dados')}
          className={tela === 'listar' ? 'active' : ''}
        >
          Listar
        </span>
      </div>

    );
}