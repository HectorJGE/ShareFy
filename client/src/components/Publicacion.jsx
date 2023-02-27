import React from "react";
import BotonLike from "./BotonLike";

function Publicacion(props) {
    
    return (
        <div className="card my-3">
            <div className="card-header">
                {props.unombre}
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
