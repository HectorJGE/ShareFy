import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import axios from 'axios'
import PublicacionForm from '../components/PublicacionForm'
import Publicacion from "../components/Publicacion.jsx";
import { allPublicacionesRoute } from "../utils/APIRoutes.js";
import Container from "../utils/responsive.js";
import styled from "styled-components";

const Loading = styled.div`
    width:200px;
    height:60px;
    transform: translate(-50%, -50%);
    .circle{
        width:20px;
        height:20px;
        position: absolute;
        border-radius: 50%;
        background-color: #fff;
        left:15%;
        transform-origin: 50%;
        animation: circle .5s alternate infinite ease;
    }
    
    @keyframes circle{
        0%{
            top:60px;
            height:5px;
            border-radius: 50px 50px 25px 25px;
            transform: scaleX(1.7);
        }
        40%{
            height:20px;
            border-radius: 50%;
            transform: scaleX(1);
        }
        100%{
            top:0%;
        }
    }
    .circle:nth-child(2){
        left:45%;
        animation-delay: .2s;
    }
    .circle:nth-child(3){
        left:auto;
        right:15%;
        animation-delay: .3s;
    }
    .shadow{
        width:20px;
        height:4px;
        border-radius: 50%;
        background-color: rgba(0,0,0,.5);
        position: absolute;
        top:62px;
        transform-origin: 50%;
        z-index: -1;
        left:15%;
        filter: blur(1px);
        animation: shadow .5s alternate infinite ease;
    }
    
    @keyframes shadow{
        0%{
            transform: scaleX(1.5);
        }
        40%{
            transform: scaleX(1);
            opacity: .7;
        }
        100%{
            transform: scaleX(.2);
            opacity: .4;
        }
    }
    .shadow:nth-child(4){
        left: 45%;
        animation-delay: .2s
    }
    .shadow:nth-child(5){
        left:auto;
        right:15%;
        animation-delay: .3s;
    }
    span{
        position: absolute;
        top:75px;
        font-family: 'Lato';
        font-size: 20px;
        letter-spacing: 12px;
        color: #fff;
        left:15%;
    }
`

function Home() {
    const [publicaciones, setPublicaciones] = useState()
    const [loading, setLoader] = useState(true)

    useEffect(() => {
        setPublicaciones()
        setLoader(true)
        axios.get(`${allPublicacionesRoute}`, { withCredentials: true })
            .then((res) => { setPublicaciones(res.data.publicaciones) })
            .catch((e) => console.log(e))
            .finally(() => setLoader(false))
    }, [])

    return (
        <Container>
            <NavBar></NavBar>
            <center>
                <div className="Container w-25">
                    <PublicacionForm />
                </div>
                <div className="Container w-25 text-start">
                    {/* Si el loading es true mostrar solo el loading, sino iterar sobre las publicaciones */}
                    {loading ?
                        <div style={{'position': 'relative', 'left': '50%', 'top': '40px'}}>
                            <Loading>
                                <div class="circle"></div>
                                <div class="circle"></div>
                                <div class="circle"></div>
                                <div class="shadow"></div>
                                <div class="shadow"></div>
                                <div class="shadow"></div>
                                <span>Loading</span>
                            </Loading>
                        </div>
                        :
                        null}

                    {publicaciones ? publicaciones.slice(0).reverse().map((index, key) => {
                        return <Publicacion key={key} uid={index.usuario.id} cancion={index.cancion} idP={index._id} unombre={index.usuario.nombre} cuerpo={index.cuerpo} likes={index.likes} />
                    }) : null}

                </div>
            </center>
        </Container>
    );
}

export default Home;
