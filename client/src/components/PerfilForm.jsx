import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { editarNombrePublicacionRoute, editarPerfilRoute, getUserRoute } from "./../utils/APIRoutes";

const PerfilForm = () => {

    const [profilePicture,setProfilePicture] = useState('');
    const [nombre,setNombre] = useState('');
    const [apellido,setApellido] = useState('');
    const [email,setEmail] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${getUserRoute}/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res)
                setNombre(res.data.user.nombre)
                setApellido(res.data.user.apellido)
                setEmail(res.data.user.email)
                setProfilePicture(res.data.user.profilePicture)
            })
            .catch((e) => console.log(e))
    }, [id])

    const submitHandler = (e) => {
        e.preventDefault()

        axios.put(`${editarPerfilRoute}/${id}`, {
            profilePicture,nombre, apellido, email
        }, { withCredentials: true })
        .then(res => {
            console.log(res)
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(res.data.updatedUsuario)
            )
        })
        .catch((err) => console.log(err))

        axios.put(`${editarNombrePublicacionRoute}/${id}`, {
            nombre
        }, { withCredentials: true })
        .then(res => console.log(res))
        .catch((err) => console.log(err))

        navigate(`/perfil/${id}`)
    }

    return ( 
        <>
            <form onSubmit={submitHandler}>
                <div className={`form-control my-5 border-success text-center bg-light`}>
                        <h5 className="my-3 text-success">Editar Perfil</h5>
                    <div className="form-floating my-3">
                        <input name="ImagenPerfil" type='text' className="form-control border-success-subtle" id="floatingInput" placeholder="Imagen de Perfil..." 
                        value={profilePicture} onChange={(e) => { setProfilePicture(e.target.value) }}></input>
                        <label htmlFor="floatingTextarea2">Url Imagen de perfil</label>
                    </div>
                    <div className="form-floating my-3">
                        <input name="nombre" type='text' className="form-control border-success-subtle" id="floatingInput" placeholder="Nombre..." 
                        value={nombre} onChange={(e) => { setNombre(e.target.value) }}></input>
                        <label htmlFor="floatingTextarea2">Nombre</label>
                    </div>
                    <div className="form-floating my-3">
                        <input name="apellido" type='text' className="form-control border-success-subtle" id="floatingInput" placeholder="Apellido..."
                        value={apellido} onChange={(e) => { setApellido(e.target.value) }}></input>
                        <label htmlFor="floatingTextarea2">Apellido</label>
                    </div>
                    <div className="form-floating my-3">
                        <input name="email" type='email' className="form-control border-success-subtle" id="floatingInput" placeholder="Email..."
                        value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        <label htmlFor="floatingTextarea2">Email</label>
                    </div>
                    <div className="row justify-content-evenly mx-1">
                        <button onClick={() => { navigate(-1) }} className="col-4 btn btn-secondary my-3" >Cancelar</button>
                        <button className="col-4 btn btn-success my-3">Actualizar</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default PerfilForm;

