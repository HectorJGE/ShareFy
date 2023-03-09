import React from "react";
import axios from 'axios'
import logo from '../images/sharefy_logo.png';
import { logoutRoute } from "./../utils/APIRoutes";

function NavBar() {
    const idUser = JSON.parse(window.localStorage.getItem('loggedUser'))._id
    const currentURL = window.location.pathname

    const logout = () => {
        axios.get(`${logoutRoute}`)
            .then(res => {
                console.log(res.data);
                window.localStorage.removeItem('loggedUser')
            })
            .catch(e => console.log(e))
        window.location.reload(false);
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <div className="align-middle">
                        <a className="navbar-brand align-items-center" href="/">
                            <img src={logo} style={{ width: '30px', height: '30px' }} alt="" /> <span className="text-bg-dark"> ShareFy</span>
                        </a>
                    </div>
                    <div>
                        {
                            currentURL.includes('/perfil/') ?
                                <a className="btn btn-success mx-3" href={`/`}>Home</a> :
                                <a className="btn btn-success mx-3" href={`/perfil/${idUser}`}>Perfil</a>
                        }
                        <button className="btn btn-success" onClick={logout}>Salir</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
