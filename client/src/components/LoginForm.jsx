import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const [email,setEmail] = useState()
    const [password,setPassword] = useState('')

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login',{
            email, password
        },{withCredentials:true, credentials:'include'}).then(res => {
            console.log(res);
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(res.data.user)
            )
            navigate('/home')
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    
    return (
        <div className="form-control my-5 w-75  text-center">
            <form onSubmit={submitHandler}>
                <div className="form-floating mt-3">
                    <input name="email" type="text" className="form-control border-success-subtle" placeholder="Title..." onChange={e=>{setEmail(e.target.value)}}></input>
                    <label htmlFor="floatingTextarea2" className="form-label">Email:</label>
                </div>
                
                <div className="form-floating mt-3">
                    <input name="pass" type="password" className="form-control border-success-subtle" placeholder="Title..." onChange={e=>{setPassword(e.target.value)}}></input>
                    <label htmlFor="floatingTextarea2" className="form-label">Contraseña:</label>
                </div>
                
                <button className="btn btn-success mt-3">Ingresar</button>
            </form>
        </div>
    );
}

export default LoginForm;
