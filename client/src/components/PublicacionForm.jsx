import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const [titulo,setTitulo] = useState()
    const [cuerpo,setCuerpo] = useState('')
    const [cancion,setCancion] = useState('')
    

    const navigate = useNavigate()

    const submitHandler = (e) => {
        const user = JSON.parse(window.localStorage.getItem('loggedUser'));
        axios.post('http://localhost:8000/api/nuevaPublicacion',{
            titulo, cancion, cuerpo, usuario:{id:user._id,nombre:user.nombre},likes:[]
        },{withCredentials:true}).then(res => {
            console.log(res);
            navigate('/home')
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    
    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="form-control my-5 border-success-subtle text-center">
                    <div className="form-floating mt-3">
                        <input name="email" type="text" className="form-control border-success-subtle" placeholder="Title..." onChange={e=>{setTitulo(e.target.value)}}></input>
                        <label htmlFor="floatingTextarea2">Título</label>
                    </div>
                    <select onChange={(e)=>{setCancion(e.target.value)}} className="form-select mt-3 border-success-subtle" aria-label="Default select example">
                        <option hidden defaultValue>Canción</option>
                        <option value="One">One</option>
                        <option value="Two">Two</option>
                        <option value="Three">Three</option>
                    </select>
                    <div className="form-floating mt-3">
                        <textarea className="form-control border-success-subtle" placeholder="Leave a comment here" style={{"height":"100px"}} onChange={e=>{setCuerpo(e.target.value)}}></textarea>
                        <label htmlFor="floatingTextarea2">Comentario</label>
                    </div>
                    <button className="btn btn-success mt-3">Publicar</button>
                </div>
            </form>
        </>
    );
}

export default LoginForm;

