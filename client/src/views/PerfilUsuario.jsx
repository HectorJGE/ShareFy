import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import Publicacion from "../components/Publicacion.jsx";
import Container from "../utils/responsive.js";
import {BsPencil} from "react-icons/bs"
import { getUserRoute, publicacionUserRoute } from "../utils/APIRoutes.js";
import ProfilePicture from "../components/ProfilePicture.jsx";

function PerfilUsuario() {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [publicaciones, setPublicaciones] = useState()
    const currentURL = window.location.pathname
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))._id

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
            <center>
                <Container>
                <NavBar></NavBar>
                <div className="Container w-25 card my-3 text-start">
                    <div className="row card-header">
                        <div className="col">
                            <span className='text-success text-decoration-none fw-bold'>Perfil</span>
                        </div>
                        {loggedUser === id?
                        <>
                            <div className="col text-end">
                                <a className="text-success" href={`/editar/perfil/${id}`}>
                                    {currentURL.includes('editar')?null:<BsPencil/>}
                                </a>
                            </div>
                        </>
                        :null}
                    </div>
                    <div className="card-body">
                        <div className="m-2 text-center">
                            <ProfilePicture currentUserImage={user.profilePicture} px="100px"></ProfilePicture>
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
                </Container>
            </center>
        </>
    );
}

export default PerfilUsuario;
