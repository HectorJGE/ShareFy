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
import Container from "../utils/responsive";


const Chat = () => {
    // Definimos los estados
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [usersConnected, setUsersConnected] = useState([]);

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
            socket.current.on("getUsers", users => { setUsersConnected(users) });
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
        <Container>  
            <NavBar />
            <EstiloChat>
                {/* // Container principal */}
                <div className="container">
                    {/* Tiene que ser una columna que agrupe los contactos uno sobre otros, el changeChat es para saber sobre que contacto se hizo click */}
                    <ContactsChat contacts={contacts} changeChat={handleChatChange} />

                    {/* En caso de que haya un chat seleccionado se muestran los mensajes y demás, sino se muestra una view vacia o algo */}
                    {currentChat === undefined ? (
                        // En caso de que no haya un chat seleccionado, colocar una vista lindita
                        <WelcomeChat />
                    ) : (
                        // En caso de que haya un chat seleccionado, se muestra el chat
                        <ChatContainer className="aaa" currentChat={currentChat} socket={socket} />
                    )}

                    {/* Usuarios conectados */}
                    <ChatUsersConnect className="Cu" usersConnected={usersConnected} contacts={contacts} changeChat={handleChatChange}/>
                </div>
            </EstiloChat>
        </Container>
    )
}

const EstiloChat = styled.div`
    height: 95vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        height: 86vh;
        width: 100vw;
    }
    .container {
        height: 85vh;
        width: 85vw;
        background-color:#010e09f6;
        display: grid;
        grid-template-columns: 25% 50% 25%;
        padding: 0px;
        // Para tamaños de tablets y celulares
        @media (max-width: 768px) {
            background-color:#010E0900;
            display: block;
            height: 90vh;
            width: 100vw;
        }
    }
`;

export default Chat