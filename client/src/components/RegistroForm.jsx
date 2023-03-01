import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from '../images/sharefy_logo.png';

const RegistroForm = () => {

    const [nombre,setNombre] = useState()
    const [apellido,setApellido] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState('')
    const [confirmPassword,setCpass] = useState()
    const [errors,setErrors] = useState()
    
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/registrar', {
            nombre, apellido, email, password, confirmPassword
        }, {withCredentials:true})
        .then((res)=>{
            console.log(res)
            navigate('/')
        }).catch((err)=>{
            setErrors(err.response.data.errors)
        })
    }
    
    return (
        <>
            <div className="form-control border-dark my-5 px-4 bg-dark">
                <img className='m-3' src={logo} style={{width:'60px',height:'60px'}} alt="" />
                <h3 className="text-light">Registro</h3>
                <form onSubmit={submitHandler}>
                    <div className="form-floating mt-3">
                        <input name="nombre" type="text" className={`form-control border-success-subtle ${errors?errors['nombre']?'is-invalid':null:null}`} placeholder="Nombre..." onChange={e=>{setNombre(e.target.value)}}></input>
                        <label htmlFor="floatingTextarea2" className="form-label">Nombre:</label>
                        {errors?errors['nombre']?
                            <div id="validationServer03Feedback" class="invalid-feedback">
                                Introduzca nombre
                            </div>
                        :null:null}
                    </div>
                    <div className="form-floating mt-3">
                        <input name="apellido" type="text" className="form-control border-success-subtle" placeholder="Nombre..." onChange={e=>{setApellido(e.target.value)}}></input>
                        <label htmlFor="floatingTextarea2" className="form-label">Apellido:</label>
                    </div>
                    
                    <div className="form-floating mt-3">
                        <input name="email" type="text" className="form-control border-success-subtle" placeholder="Nombre..." onChange={e=>{setEmail(e.target.value)}}></input>
                        <label htmlFor="floatingTextarea2" className="form-label">Email:</label>
                    </div>
                    
                    <div className="form-floating mt-3">
                        <input name="pass" type="password" className="form-control border-success-subtle" placeholder="Nombre..." onChange={e=>{setPassword(e.target.value)}}></input>
                        <label htmlFor="floatingTextarea2" className="form-label">Contraseña:</label>
                    </div>
                    
                    <div className="form-floating mt-3">
                        <input name="cpass" type="password" className="form-control border-success-subtle" placeholder="Nombre..." onChange={e=>{setCpass(e.target.value)}}></input>
                        <label htmlFor="floatingTextarea2" className="form-label">Confirmar Contraseña:</label>
                    </div>

                    <div className="row justify-content-between mx-1 my-4 ">
                        <a className="col-4 btn btn-success " href="/login" >Volver</a>
                        <button className="col-4 btn btn-success ">Registrarse</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default RegistroForm;
