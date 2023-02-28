import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./views/Home";
import Login from './views/Login';
import Registro from './views/Registro';
import PublicacionView from "./views/PublicacionView";
import PerfilUsuario from "./views/PerfilUsuario";

function App() {
  

  const user = window.localStorage.getItem('loggedUser')
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/registro" element={<Registro/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/perfil/:id" element={<PerfilUsuario/>}/>
          <Route exact path="/publicacion/:id" element={<PublicacionView/>}/>
        </Routes>
      </BrowserRouter>

    </>
  );
}


export default App;
