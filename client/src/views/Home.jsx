import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import axios from 'axios'
import PublicacionForm from '../components/PublicacionForm'
import Publicacion from "../components/Publicacion.jsx";
import { allPublicacionesRoute } from "../utils/APIRoutes.js";
import Container from "../utils/responsive.js";

function Home() {
    const [publicaciones, setPublicaciones] = useState()

    useEffect(() => {
        axios.get(`${allPublicacionesRoute}`, { withCredentials: true })
            .then((res) => { setPublicaciones(res.data.publicaciones) })
            .catch((e) => console.log(e))
    }, [])

    return (
        <Container>      
            <NavBar></NavBar>
            <center>
                <div className="Container w-25">
                    <PublicacionForm />
                </div>
                <div className="Container w-25 text-start">
                    {publicaciones ? publicaciones.slice(0).reverse().map((index, key) => {
                        return <Publicacion key={key} uid={index.usuario.id} cancion={index.cancion} idP={index._id} unombre={index.usuario.nombre} cuerpo={index.cuerpo} likes={index.likes} />
                    }) : null}
                </div>
            </center>
        </Container>
    );
}

export default Home;
