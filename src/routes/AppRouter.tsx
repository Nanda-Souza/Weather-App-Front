import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastrarDadosMeteorologicos from "../pages/cadastrar-dados/CadastrarDadosMeteorologicos";

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/cadastrar-dados" element={<CadastrarDadosMeteorologicos />} />
            </Routes>
        </BrowserRouter>
    );
}
