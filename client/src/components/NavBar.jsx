import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import logo from '../images/sharefy_logo.png';

function NavBar() {
    
    const navigate = useNavigate();
    
    const idUser = JSON.parse(window.localStorage.getItem('loggedUser'))._id
    const currentURL = window.location.pathname

    const logout= () => {
        axios.get('http://localhost:8000/api/logout')
        .then(res=>{
            console.log(res.data);
            window.localStorage.removeItem('loggedUser')
        })
        .catch(e=>console.log(e))
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <div className="align-middle">
                        <a className="navbar-brand align-items-center" href="/">
                            <img src={logo} style={{width:'30px',height:'30px'}} alt="" /> <span className="text-bg-dark"> ShareFy</span>
                        </a>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div>
                        {
                            currentURL.includes('/perfil/')?
                            <a className="btn btn-success mx-3" href={`/`}>Home</a>:
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
