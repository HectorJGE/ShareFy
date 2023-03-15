import React, { useState } from "react";
import axios from 'axios'
import logo from '../images/sharefy_logo.png';
import { logoutRoute, searchUser } from "./../utils/APIRoutes";
import styled from "styled-components"
import { AiOutlineHome, AiOutlineUser, AiOutlineMessage, AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";

function NavBar() {
    const idUser = JSON.parse(window.localStorage.getItem('loggedUser'))._id
    const [searchResults, setSearchRestults]= useState([])
    const logout = () => {
        axios.get(`${logoutRoute}`)
            .then(res => {
                console.log(res.data);
                window.localStorage.removeItem('loggedUser')
            })
            .catch(e => console.log(e))
        window.location.reload(false);
    }
    
    const buscar = (e)=>{
        if(!e.target.value){
            setSearchRestults([])
        }
        axios.get(`${searchUser}/${e.target.value}`)
            .then(res => {
                console.log(res.data);
                setSearchRestults(res.data)
            })
            .catch(e => console.log(e))
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
                    <div className="text-decoration-none fs-5 text-light d-flex align-items-center">                   
                        
                        <AiOutlineHome className="ms-3 me-1"/>
                        <a className="nav-opt fs-5 text-decoration-none" href={`/`}> Home</a>
                        <AiOutlineUser className="ms-3 me-1"/>
                        <a className="nav-opt fs-5 text-decoration-none" href={`/perfil/${idUser}`}> Perfil</a>
                        <AiOutlineMessage className="ms-3 me-1"/>
                        <a className="nav-opt fs-5 text-decoration-none" href={`/chat`}>Chat</a>
                        <AiOutlineLogout className="ms-3 me-1"/>
                        <a className="nav-opt fs-5 text-decoration-none" href="." onClick={logout}>Salir</a>
                    </div>
                        
                        <div className="d-flex align-items-center ms-auto w-25">
                            <AiOutlineSearch className=" mx-3 text-light fs-5"/>
                            <form className="w-100 buscador" role="search">
                                <input className="w-100 form-control " type="search" onChange={buscar} placeholder="Buscar usuario..." aria-label="Search"></input>
                                <div className="w-25 bg-light position-absolute rounded">
                                    {searchResults?
                                        searchResults.slice(0,5).map((usuario,index)=>{
                                            return (
                                                <a className="text-start sr text-black text-decoration-none" href={`/perfil/${usuario._id}`} key={index}>
                                                    <div  className=" p-2">{usuario.nombre} {usuario.apellido}</div>
                                                </a>
                                            )
                                        })
                                    :null
                                    }
                                </div>
                            </form>
                        </div>
                    
                </div>
            </nav>
        </Container>
    );
}

const Container = styled.div`
    sr:hover{
        opacity:0.5;
    }
    .nav-opt{
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
