import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastrarDadosMeteorologicos from "../pages/cadastrar-dados/CadastrarDadosMeteorologicos";
import ListarDadosMeteorologicos from "../pages/listar-dados/ListarDadosMeteorologicos";
import EditarDadosMeteorologicos from "../pages/editar-dados/EditarDadosMeteorologicos"
import Home from "../pages/home/Home";

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/cadastrar-dados" element={<CadastrarDadosMeteorologicos />} />
                <Route path="/editar/:id" element={<EditarDadosMeteorologicos />} />
                <Route path="/listar-dados" element={<ListarDadosMeteorologicos />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
