import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import ContactsChat from "../components/ContactsChat";
import ChatContainer from "../components/ChatContainer";
import styled from "styled-components";
import ChatUsersConnect from "../components/ChatUsersConnect";
import NavBar from "../components/NavBar";
import WelcomeChat from "../components/WelcomeChat";


const Chat = () => {
    // Definimos los estados
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    const navegar = useNavigate();
    const socket = useRef();

    // Solamente se ejecuta una vez al montar el componente
    useEffect(() => {
        // Verificamos si el usuario está logueado
        if (!(JSON.parse(window.localStorage.getItem('loggedUser')))) {
            // Si no está logueado, lo redirigimos al login
            navegar('/login')
        } else {
            // Si está logueado, obtenemos el id del usuario
            setCurrentUser(JSON.parse(window.localStorage.getItem('loggedUser'))._id)
        }
    }, [navegar])

    // Se ejecuta cada vez que cambia el estado de currentUser
    useEffect(() => {
        // Si el usuario esta logueado, conectamos el socket
        if (currentUser) {
            socket.current = io(process.env.REACT_APP_API_BASE_URL);
            socket.current.emit("addUser", currentUser);
        }
    }, [currentUser])

    // Se ejecuta cada vez que cambia el estado de currentUser
    useEffect(() => {
        // Si el usuario esta logueado, obtenemos los contactos
        if (currentUser) {
            axios.get(`${allUsersRoute}/${currentUser}`)
                .then(res => {
                    setContacts(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [currentUser])

    // Función que se ejecuta cuando se cambia de chat
    const handleChatChange = (user) => {
        setCurrentChat(user)
    }

    return (
        <>
            <NavBar />
            {/* // Container principal */}
            <Container>
                <div className="container">
                    {/* Tiene que ser una columna que agrupe los contactos uno sobre otros, el changeChat es para saber sobre que contacto se hizo click */}
                    <ContactsChat contacts={contacts} changeChat={handleChatChange} />

                    {/* En caso de que haya un chat seleccionado se muestran los mensajes y demás, sino se muestra una view vacia o algo */}
                    {currentChat === undefined ? (
                        // En caso de que no haya un chat seleccionado, colocar una vista lindita
                        <WelcomeChat />
                    ) : (
                        // En caso de que haya un chat seleccionado, se muestra el chat
                        <ChatContainer currentChat={currentChat} socket={socket} />
                    )}

                    {/* Usuarios conectados */}
                    <ChatUsersConnect />
                </div>
            </Container>
        </>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #001e13;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 50% 25%;
        padding: 0;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;

export default Chat