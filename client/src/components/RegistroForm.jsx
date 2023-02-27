import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegistroForm = () => {

    const [nombre,setNombre] = useState()
    const [apellido,setApellido] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState('')
    const [confirmPassword,setCpass] = useState()
    
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/registrar', {
            nombre, apellido, email, password, confirmPassword
        }, {withCredentials:true})
        .then((res)=>{
            console.log(res)
            navigate('/home')
        }).catch((err)=>{
            console.log(err.response)
        })
    }
    
    return (
        <>
            <form onSubmit={submitHandler}>
                <label htmlFor="nombre" className="form-label">Nombre: </label>
                <input name="nombre" type="text" className="form-control" onChange={e=>{setNombre(e.target.value)}}></input>
                
                <label htmlFor="apellido" className="form-label">Apellido: </label>
                <input name="apellido" type="text" className="form-control" onChange={e=>{setApellido(e.target.value)}}></input>
                
                <label htmlFor="email" className="form-label">Email:</label>
                <input name="email" type="text" className="form-control" onChange={e=>{setEmail(e.target.value)}}></input>
                
                <label htmlFor="pass" className="form-label">Contraseña:</label>
                <input name="pass" type="password" className="form-control" onChange={e=>{setPassword(e.target.value)}}></input>
                
                <label htmlFor="cpass" className="form-label">Confirmar Contraseña:</label>
                <input name="cpass" type="password" className="form-control" onChange={e=>{setCpass(e.target.value)}}></input>
                
                <button className="btn btn-success mt-3">Registrarse</button>
            </form>
        </>
    );
}

export default RegistroForm;
