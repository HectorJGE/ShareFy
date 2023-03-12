import React from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { publicacionRoute } from './../utils/APIRoutes.js'
import axios from "axios";

function BotonLike(props) {

    const [liked, setLiked] = useState()
    const [clike, setClike] = useState(props.cant)

    const idUser = JSON.parse(window.localStorage.getItem('loggedUser'))._id

    useEffect(() => {
        axios.get(`${publicacionRoute}/${props.idP}`, { withCredentials: true })
            .then((res) => {

                if (res.data.likes.find(e => e.idUser === idUser)) {
                    setLiked(true)
                } else {
                    setLiked(false)
                }
            })
            .catch((e) => console.log(e))
    }, [idUser, props.idP])

    const ApiCall = (param) => {
        axios.put(`${publicacionRoute}/${param}/${props.idP}`, {
            idUser
        }, { withCredentials: true })
        .then((res) => {
            console.log(res)
        })
        .catch((e) => console.log(e.response))
    }

    const Like = () => {
        setClike(clike + 1)

        setLiked(true)
        ApiCall('like')
    }

    const disLike = () => {
        setClike(clike - 1)
        setLiked(false)
        ApiCall('unlike')
    }


    return (
        <div className="col">
            {
                liked ? <AiTwotoneHeart className="me-3" onClick={disLike} /> : <AiOutlineHeart className="me-3" onClick={Like} />
            }
            {clike} Likes
        </div>
    );
}

export default BotonLike;
