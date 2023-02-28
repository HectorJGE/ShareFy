import React from "react";
import BotonLike from "./BotonLike";
import {AiOutlineDelete} from "react-icons/ai";
import axios from "axios";

function Publicacion(props) {

    const idUser = JSON.parse(window.localStorage.getItem('loggedUser'))._id

    const borrarPubli = () => {
        axios.delete(`http://localhost:8000/api/borrar/${props.idP}`,{withCredentials:true})
        .then(res=>console.log(res))
        .catch(error=>console.log(error))
        window.location.reload(false);
    }
    
    return (
        <div className="card my-3">
            <div className="row card-header">
                <div className="col">
                    <a className=' link-success text-decoration-none fw-bold' href={`/perfil/${props.uid}`}>
                        {props.unombre}
                    </a>
                </div>
                <div className="col text-end">
                    {props.uid == idUser?<AiOutlineDelete onClick={borrarPubli}/>:null}
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.titulo}</h5>
                <p className="card-text">{props.cancion}</p>
                <p className="card-text">{props.cuerpo}</p>
            </div>
            <div className="card-footer text-muted"> <BotonLike stlye={{}} idP={props.idP} cant={props.likes.length}/>
            </div>
        </div>
    );
};

export default Publicacion;
