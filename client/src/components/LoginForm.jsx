import React, { useState } from "react";
import axios from 'axios';
import logo from '../images/sharefy_logo.png';

const LoginForm = () => {

    const [email,setEmail] = useState()
    const [password,setPassword] = useState('')
    const [error,setError] = useState()


    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login',{
            email, password
        },{withCredentials:true, credentials:'include'}).then(res => {
            console.log(res);
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(res.data.user)
            )
            window.location.reload(false);
        })
        .catch((err) =>{
            setError(err.response.data.error)
        })
    }
    
    return (
        <div className="form-control border-dark my-5 px-4 text-center bg-dark">
            <img className='m-3' src={logo} style={{width:'60px',height:'60px'}} alt="" />
            <h3 className="text-light">Log in</h3>
            <form onSubmit={submitHandler}>
                {error?<div className="text-danger">{error}</div>:null}
                <div className="form-floating mt-3">
                    <input name="email" type="text" className="form-control border-success-subtle" placeholder="Title..." onChange={e=>{setEmail(e.target.value)}}></input>
                    <label htmlFor="floatingTextarea2" className="form-label">Email:</label>
                </div>
                
                <div className="form-floating mt-3">
                    <input name="pass" type="password" className="form-control border-success-subtle" placeholder="Title..." onChange={e=>{setPassword(e.target.value)}}></input>
                    <label htmlFor="floatingTextarea2" className="form-label">Contraseña:</label>
                </div>
                <div className="row justify-content-between mx-1 my-3 ">
                    <a href='/registro' className="col-4 btn btn-success">Registrarse</a>
                    <button className="col-4 btn btn-success">Loguearse</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
