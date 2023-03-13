import React from "react";
import axios from 'axios'
import logo from '../images/sharefy_logo.png';
import { logoutRoute } from "./../utils/APIRoutes";
import styled from "styled-components";

function NavBar() {
    const idUser = JSON.parse(window.localStorage.getItem('loggedUser'))._id

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
        <Container>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <div className="align-middle">
                        <a className="navbar-brand align-items-center" href="/">
                            <img src={logo} style={{ width: '30px', height: '30px' }} alt="" /> <span className="text-bg-dark"> ShareFy</span>
                        </a>
                    </div>
                    <div className="link-success text-decoration-none">                            
                        <a className="fs-5 text-decoration-none ms-3" href={`/`}>Home</a>
                        <a className="fs-5 text-decoration-none ms-3" href={`/perfil/${idUser}`}>Perfil</a>
                        <a className="fs-5 text-decoration-none ms-3" href={`/chat`}>Chat</a>
                        <a className="fs-5 text-decoration-none ms-3" href="#" onClick={logout}>Salir</a>
                    </div>
                    
                    <div className="buscador w-25 ms-auto">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </Container>
    );
}

const Container = styled.div`
    a{
        color:white;!important
    }
    a:hover{
        color:#4caf50;
        transition:0.3s;
    }
    .buscador{
        @media screen and (max-width: 720px){
            margin:10px
        }  
    }   
`;
export default NavBar;
