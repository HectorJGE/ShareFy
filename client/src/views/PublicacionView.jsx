import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import Publicacion from "../components/Publicacion.jsx";
import ComentariosForm from "../components/ComentariosForm.jsx";
import Comentario from "../components/Comentario.jsx";
import { publicacionRoute } from "../utils/APIRoutes.js";

function PublicacionView(props) {
    const { id } = useParams()
    const [publicacion, setPublicacion] = useState()

    useEffect(() => {
        axios.get(`${publicacionRoute}/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                setPublicacion(res.data)
            })
            .catch((e) => console.log(e))
    }, [id])

    return (
        <>
            <NavBar></NavBar>
            <center>
                <div className="Container w-25">
                    {publicacion ?
                        <>
                            <Publicacion uid={publicacion.usuario.id} cancion={publicacion.cancion} idP={publicacion._id} unombre={publicacion.usuario.nombre} titulo={publicacion.titulo} cuerpo={publicacion.cuerpo} likes={publicacion.likes} />
                            <div data-bs-spy="scroll" className="card form-control ">
                                <ComentariosForm idP={publicacion._id} />
                                {publicacion.comentarios.slice(0).reverse().map((comentario, i) => {
                                    return <Comentario key={i} idP={publicacion._id} uid={comentario.idUsuario} uName={comentario.usuario} comentario={comentario.comentario} />
                                })}
                            </div>
                        </> : null
                    }
                </div>
            </center>
        </>
    );
}

export default PublicacionView;
