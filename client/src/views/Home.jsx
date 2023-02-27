import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import axios from 'axios'

import PublicacionForm from '../components/PublicacionForm'
import Publicacion from "../components/Publicacion.jsx";

function Home() {
    const [publicaciones,setPublicaciones] = useState()

    useEffect(()=>{
        axios.get("http://localhost:8000/api/todasLasPublicaciones",{withCredentials:true})
        .then((res)=>{setPublicaciones(res.data.publicaciones)})
        .catch((e)=>console.log(e))
    },[]) 

    return (
        <>
            <NavBar></NavBar>
            <center>
                <div className="Container w-25">
                    <PublicacionForm/>
                </div>
                <div className="Container w-25 text-start">
                {publicaciones ? publicaciones.slice(0).reverse().map((index, key)=>{
                    return <Publicacion key={key} cancion={index.cancion} idP={index._id} unombre={index.usuario.nombre} titulo={index.titulo} cuerpo={index.cuerpo} likes={index.likes}/>
                }): null}
                    
                </div>
            </center>
        </>
    );
}

export default Home;
