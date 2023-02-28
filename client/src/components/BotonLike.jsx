import React from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

function BotonLike(props) {

    const [liked,setLiked] = useState()
    const [clike,setClike] = useState(props.cant)
    
    const idUser = JSON.parse(window.localStorage.getItem('loggedUser'))._id
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/Publicacion/${props.idP}`,{withCredentials:true})
        .then((res)=>{

            if(res.data.likes.find(e => e.idUser == idUser)){
                setLiked(true)
            }else{
                setLiked(false)
            }
        })
        .catch((e)=>console.log(e))
    },[]) 

    const ApiCall = (param) => {
        axios.put(`http://localhost:8000/api/${param}/${props.idP}`,{
            idUser
        },{withCredentials:true})
        .then((res)=>{
            console.log(res)
        })
        .catch((e)=>console.log(e))
        console.log(props.idP)
        console.log(idUser)
    }
    
    const Like = (e) => {
        setClike(clike+1)
        
        setLiked(true)
        ApiCall('updateLike')
    }

    const disLike = (e) => {
        setClike(clike-1)
        setLiked(false)
        ApiCall('deleteLike')
    }
    

    return (
        <>  
            {
                liked ? <AiTwotoneHeart className="me-3" onClick={disLike}/> :<AiOutlineHeart className="me-3" onClick={Like}/>
            }
            {clike} Likes
        </>
    );
}

export default BotonLike;
