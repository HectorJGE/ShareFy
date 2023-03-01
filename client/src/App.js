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
          <Route exact path="/" element={user?<Home/>:<Login/>}/>
          <Route exact path="/perfil/:id" element={user?<PerfilUsuario/>:<Login/>}/>
          <Route exact path="/publicacion/:id" element={user?<PublicacionView/>:<Login/>}/>
          <Route exact path="/login" element={user?<Home/>:<Login/>}/>
          <Route exact path="/registro" element={user?<Home/>:<Registro/>}/>
          <Route exact path="*" element={user?<Home/>:<Login/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}


export default App;
