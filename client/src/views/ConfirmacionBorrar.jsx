import React,{useEffect,useState} from "react";
import NavBar from "../components/NavBar.jsx";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

import Publicacion from "../components/Publicacion.jsx";

function ConfirmacionBorrar(props) {
    const {id} = useParams()
    
    const [publicacion,setPublicacion] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/publicacion/${id}`,{withCredentials:true})
        .then((res)=>{
            setPublicacion(res.data)
        })
        .catch((e)=>console.log(e))
        
    },[id]) 

    const borrarPubli = () => {
        axios.delete(`http://localhost:8000/api/publicacion/borrar/${id}`,{withCredentials:true})
        .then(res=>console.log(res))
        .catch(error=>console.log(error))
        navigate('/')
    }
    return (
        <>
            <NavBar></NavBar>
            <center>
                <div className="Container w-25">
                    {publicacion?
                        <>
                            <Publicacion uid={publicacion.usuario.id} cancion={publicacion.cancion} idP={publicacion._id} unombre={publicacion.usuario.nombre} titulo={publicacion.titulo} cuerpo={publicacion.cuerpo} likes={publicacion.likes}/>
                            
                            <div className="card my-3 text-start">
                                <h5 className="card-header text-success">¿Está seguro que desea eliminar esta publiación?</h5>
                            <div className="row justify-content-evenly mx-1 my-4 ">
                                <button onClick={()=>{navigate(-1)}} className="col-4 btn btn-secondary " >Cancelar</button>
                                <button onClick={borrarPubli} className="col-4 btn btn-success ">Eliminar</button>
                            </div>
                                
                            </div>
                        </>:null
                        
                    } 
                </div>
            </center>
        </>
    );
}

export default ConfirmacionBorrar;
