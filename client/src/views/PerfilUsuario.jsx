import React,{useEffect,useState} from "react";
import NavBar from "../components/NavBar.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

import Publicacion from "../components/Publicacion.jsx";

function PerfilUsuario() {
    const {id} = useParams()
    
    const [user,setUser] = useState({})
    const [publicaciones,setPublicaciones] = useState()
    
    useEffect(()=>{

        axios.get(`http://localhost:8000/api/ppu/${id}`,{withCredentials:true})
        .then((res)=>{setPublicaciones(res.data.publicaciones)})
        .catch((e)=>console.log(e))

        axios.get(`http://localhost:8000/api/user/${id}`
        ,{withCredentials:true})
        .then((res)=>{
            setUser(res.data.user)
        })
        .catch((e)=>console.log(e))
    },[id]) 
    return (
        <>
            <NavBar></NavBar>
            <center>
                <div className="Container w-50">
                    <div className="form-control my-5 w-75 text-light text-start bg-dark">
                        <h1>Perfil</h1>
                        <hr></hr>
                        <h5>Nombre Completo: {user.nombre} {user.apellido}</h5>
                        <h5>Email: {user.email}</h5>
                    </div>
                </div>
                <div className="Container w-25 text-start">
                    {publicaciones ? publicaciones.slice(0).reverse().map((index, key)=>{
                        return <Publicacion key={key} uid={index.usuario.id} cancion={index.cancion} idP={index._id} unombre={index.usuario.nombre} titulo={index.titulo} cuerpo={index.cuerpo} likes={index.likes}/>
                    }): null}
                </div>
            </center>
        </>
    );
}

export default PerfilUsuario;
