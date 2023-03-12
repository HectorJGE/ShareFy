import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import Publicacion from "../components/Publicacion.jsx";
import {BsPencil} from "react-icons/bs"
import { getUserRoute, publicacionUserRoute } from "../utils/APIRoutes.js";
import perfilcito from '../images/sharefy_logo.png';

function PerfilUsuario() {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [publicaciones, setPublicaciones] = useState()
    const currentURL = window.location.pathname

    useEffect(() => {
        axios.get(`${publicacionUserRoute}/${id}`, { withCredentials: true })
            .then((res) => { setPublicaciones(res.data.publicaciones) })
            .catch((e) => console.log(e))

        axios.get(`${getUserRoute}/${id}`
            , { withCredentials: true })
            .then((res) => {
                setUser(res.data.user)
            })
            .catch((e) => console.log(e))
    }, [id])

    return (
        <>
            <NavBar></NavBar>
            <center>
                <div className="Container w-25 card my-3 text-start">
                    <div className="row card-header">
                        <div className="col">
                            <span className='link-success text-decoration-none fw-bold'>Perfil</span>
                        </div>
                        <div className="col text-end">
                            <a className="text-success" href={`/editar/perfil/${id}`}>
                                {currentURL.includes('editar')?null:<BsPencil/>}
                            </a>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="m-2 text-center">
                            <img src={perfilcito} alt="perfil" className="img-circle img-fluid" style={{ height: "100px", width: "100px" }}/>
                            <h5 className="mx-auto mt-4">{user.nombre} {user.apellido}</h5>
                            <h5 className="text-muted">{user.email}</h5>
                        </div>
                    </div>
                </div>
                <div className="Container w-25 text-start">
                    {publicaciones ? publicaciones.slice(0).reverse().map((index, key) => {
                        return <Publicacion key={key} uid={index.usuario.id} cancion={index.cancion} idP={index._id} unombre={index.usuario.nombre} titulo={index.titulo} cuerpo={index.cuerpo} likes={index.likes} />
                    }) : null}
                </div>
            </center>
        </>
    );
}

export default PerfilUsuario;
