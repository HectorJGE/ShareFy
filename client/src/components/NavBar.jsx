import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function NavBar() {
    
    const navigate = useNavigate();
    
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
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home">ShareFy</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div>
                        <a className="btn btn-success mx-3" href="/perfil">Perfil</a>
                        <button className="btn btn-success" onClick={logout}>Salir</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
