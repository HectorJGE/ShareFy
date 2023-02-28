import React, { useState } from "react";
import {AiOutlineDelete} from "react-icons/ai";
import axios from "axios";
const Comentario = (props) => {

    const idUser = JSON.parse(window.localStorage.getItem('loggedUser'))._id

    const borrarPubli = () => {
        axios.put(`http://localhost:8000/api/deleteComentario/${props.idP}`,{
            'idUsuario':props.uid, 
            'usuario':props.uName, 
            'comentario':props.comentario
        },{withCredentials:true})
        .then(res=>console.log(res))
        .catch(error=>console.log(error))
        window.location.reload(false);
    }
    
    
    return (
        <>  
            <div className="row card-header border text-start">
                
                <div className="row">
                    <a className='col link-success text-decoration-none fw-bold' href={`/perfil/${props.uid}`}>
                        {props.uName}:
                    </a> 
                    <div className="col text-end">
                        {props.uid == idUser?<AiOutlineDelete onClick={borrarPubli}/>:null}
                    </div>
                </div>
                <p>{props.comentario}</p>
            </div>
        </>
    );
}

export default Comentario;
