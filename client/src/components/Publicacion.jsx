import React from "react";
import BotonLike from "./BotonLike";
import {AiOutlineDelete} from "react-icons/ai";
import {BsPencil} from "react-icons/bs"
import SearchResultado from "./SearchResultado";

function Publicacion(props) {

    const idUser = JSON.parse(window.localStorage.getItem('loggedUser'))._id
    const currentURL = window.location.pathname
    
    return (
        <div className="card my-3 text-start">
            <div className="row card-header">
                <div className="col">
                    <a className=' link-success text-decoration-none fw-bold' href={`/perfil/${props.uid}`}>
                        {props.unombre}
                    </a>
                </div>
                <div className="col text-end">
                    
                {props.uid === idUser?
                    <>
                        <a className="text-success" href={`/editar/publicacion/${props.idP}`}>
                            {currentURL.includes('editar')?null:<BsPencil/>}
                        </a>
                        <a className="text-success ms-2" href={`/borrar/publicacion/${props.idP}`}>
                            {currentURL.includes('borrar')?null:<AiOutlineDelete/>}
                        </a>
                    </>
                    :null}
                </div>
            </div>
            <div className="card-body">
                <a className=' link-success text-decoration-none fw-bold' href={`/publicacion/${props.idP}`}>
                    <SearchResultado title={props.cancion.titulo} img={props.cancion.imgUrl} artist={props.cancion.artist}></SearchResultado>
                </a>
                <p className="card-text">{props.cuerpo}</p>
            </div>
            
            <div className="row justify-content-between card-footer text-muted">
                <BotonLike className=" border" stlye={{}} idP={props.idP} cant={props.likes.length}/>
                {
                    currentURL.includes('/publicacion')?null:<a className='col text-end text-decoration-none text-success' href={`/publicacion/${props.idP}`}>Ver Publicación</a>
                }
                
            </div>
        </div>
    );
};

export default Publicacion;
