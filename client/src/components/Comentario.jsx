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
            <hr></hr>
            <div className="text-start">
                <div className="row justify-content-between">
                    <a className='col  link-success text-decoration-none fw-bold' href={`/perfil/${props.uid}`}>
                        {props.uName}:
                    </a> 
                    <div className="col  text-end">
                        {props.uid === idUser?<a className="text-success" href="#"><AiOutlineDelete onClick={borrarPubli}/></a>:null}
                    </div>
                </div>
                <p>{props.comentario}</p>
            </div>
        </>
    );
}

export default Comentario;
