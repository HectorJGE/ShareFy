import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getFollowersRoute, getFollowedRoute } from '../utils/APIRoutes'
import ProfilePicture from './ProfilePicture'
import LoadingGif from "./../images/loading.gif"
import styled from 'styled-components'

const Container = styled.div`
    -webkit-transform: translate(0,-30%);
    -o-transform: translate(0,-30%);
    transform: translate(0,-30%);
    top: 30%;
    margin: 0 auto;
`;

const FollowsContainer = ({ option }) => {
    const { id } = useParams()
    const [users, setUsers] = useState()
    const [cargado, setCargado] = useState(false)
    
    const handleOpenModal = (event) => {
        if(option==="Seguidores"){
            axios.get(`${getFollowersRoute}/${id}`, { withCredentials: true })
                .then( res => {
                    setUsers(res.data)
                    setCargado(true)
                })
        }else if(option==="Seguidos"){
            axios.get(`${getFollowedRoute}/${id}`, { withCredentials: true })
                .then( res => {
                    setUsers(res.data)
                    setCargado(true)
                })
        }
    };

    const handleCloseModal = () => {
        setCargado(false)
    }

    useEffect(() => {
        const followersDiv = document.getElementById('followersDiv')
        const followsDiv = document.getElementById('followsDiv')

        followersDiv.addEventListener('show.bs.modal', handleOpenModal);
        followsDiv.addEventListener('show.bs.modal', handleOpenModal);
        followersDiv.addEventListener('hidden.bs.modal', handleCloseModal);
        followsDiv.addEventListener('hidden.bs.modal', handleCloseModal);

        return () => {
            followersDiv.removeEventListener('show.bs.modal', handleOpenModal);
            followsDiv.removeEventListener('show.bs.modal', handleOpenModal);
            followersDiv.removeEventListener('hidden.bs.modal', handleCloseModal);
            followsDiv.removeEventListener('hidden.bs.modal', handleCloseModal);
        };
    });

    return (
        <Container className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{option}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {
                        cargado ?
                            users.length !== 0 ?
                                users.map((value,index) => {
                                    return (
                                        <div className='d-flex align-items-center ms-5' key={index}>
                                            <div className='flex-shrink-0'>
                                                <ProfilePicture currentUserImage={value.profilePicture} px="40px"/>
                                            </div>
                                            <a className=" text-decoration-none" href={`/perfil/${value._id}`}><h5 className='flex-grow-3 ms-3'>{value.nombre} {value.apellido}</h5></a>
                                        </div>
                                    )
                                })
                                :
                                <h5>No se han encontrado {option}</h5>
                        :
                        <img src={LoadingGif} alt="Cargando ..." />
                    }
                </div>
            </div>
        </Container>
    )
}

export default FollowsContainer