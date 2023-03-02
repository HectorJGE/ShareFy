import React, { useState } from "react";
import axios from 'axios';

const ComentariosForm = (props) => {

    const [comentario,setComentario] = useState('')


    const submitHandler = () => {
        const user = JSON.parse(window.localStorage.getItem('loggedUser'));

        axios.put(`http://localhost:8000/api/publicacion/agregar/comentario/${props.idP}`,{
            'idUsuario':user._id, 
            'usuario':user.nombre, 
            'comentario':comentario
        },{withCredentials:true}).then(res => {
            console.log(res);
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    
    return (
        <>
            <form onSubmit={submitHandler}>
                    <div className="form-floating mt-3">
                        <textarea className="form-control border-success-subtle" placeholder="Comentario..." style={{"height":"100px"}} onChange={e=>{setComentario(e.target.value)}}></textarea>
                        <label htmlFor="floatingTextarea2">Comentario</label>
                    </div>
                    <button className=" btn btn-success mt-3">Comentar</button>
            </form>
        </>
    );
}

export default ComentariosForm;

