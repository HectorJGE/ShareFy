import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { loginRoute } from "./../utils/APIRoutes";
import logo from '../images/sharefy_logo.png';
import Loader from "./Loader";

const LoginForm = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${loginRoute}`, {
            email, password
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(res.data.user)
                )
                window.location.reload(false);
            })
            .catch((err) => {
                setError(err.response.data.error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="form-control border-dark my-5 px-4 text-center bg-dark">
            {loading && <Loader />}
            <img className='m-3' src={logo} style={{ width: '60px', height: '60px' }} alt="" />
            <h3 className="text-light">Log in</h3>
            <form onSubmit={submitHandler}>
                {error ? <div className="text-danger">{error}</div> : null}
                <div className="form-floating mt-3">
                    <input name="email" type="text" disabled={loading} className="form-control border-success-subtle" placeholder="Title..." onChange={e => { setEmail(e.target.value) }}></input>
                    <label htmlFor="floatingTextarea2" className="form-label">Email:</label>
                </div>

                <div className="form-floating mt-3 mb-3">
                    <input name="pass" type="password" disabled={loading} className="form-control border-success-subtle" placeholder="Title..." onChange={e => { setPassword(e.target.value) }} autoComplete="current-password"></input>
                    <label htmlFor="floatingTextarea2" className="form-label">Contraseña:</label>
                </div>
                <div className="row justify-content-between">
                    <button 
                        disabled={loading} 
                        className="col btn btn-success m-3 mt-0"
                        onClick={() => navigate('/registro')}
                        >Registrarse
                    </button>
                    <button disabled={loading} className="col btn btn-success m-3 mt-0">Loguearse</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
