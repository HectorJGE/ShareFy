import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./views/Home";
import Login from './views/Login';
import Registro from './views/Registro';
import PublicacionView from "./views/PublicacionView";
import PerfilUsuario from "./views/PerfilUsuario";
import ConfirmacionBorrar from "./views/ConfirmacionBorrar";
import EditarPublicacion from "./views/EditarPublicacion";

function App() {
	const user = window.localStorage.getItem('loggedUser')

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={user ? <Home /> : <Navigate to="/login" />} />
					<Route exact path="/perfil/:id" element={user ? <PerfilUsuario /> : <Navigate to="/login" />} />
					<Route exact path="/publicacion/:id" element={user ? <PublicacionView /> : <Navigate to="/login" />} />
					<Route exact path="/editar/publicacion/:id" element={user ? <EditarPublicacion /> : <Navigate to="/login" />} />
					<Route exact path="/borrar/publicacion/:id" element={user ? <ConfirmacionBorrar /> : <Navigate to="/login" />} />
					<Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
					<Route exact path="/registro" element={user ? <Navigate to="/login" /> : <Registro />} />
					<Route exact path="*" element={user ? <Navigate to="/login" /> : <Login />} />
				</Routes>
			</BrowserRouter>

		</>
	);
}


export default App;
