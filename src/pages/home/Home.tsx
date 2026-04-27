import Footer from "../../components/footers/Footer";
import NavBar from "../../components/headers/NavBar";


export default function Home(){
    return(
        <div className="container">
              <NavBar tela="home" />
              <Footer />
        
        </div>
    );
}