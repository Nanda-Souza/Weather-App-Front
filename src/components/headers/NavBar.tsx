import './NavBar.css'

type NavBarProps = {
  tela: 'home' | 'cadastrar' | 'listar';
};

export default function NavBar({tela}: NavBarProps){
    return(
        <div className="navbar">
        <a href="#">Home</a>
        <a href="#" className={tela === 'cadastrar' ? "active": ""}>Cadastrar</a>
        <a href="#">Listar</a>
      </div>

    );
}