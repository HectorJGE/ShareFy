import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import ContactsChat from "../components/ContactsChat";
import ChatContainer from "../components/ChatContainer";

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
        if(!(JSON.parse(window.localStorage.getItem('loggedUser')))) {
            // Si no está logueado, lo redirigimos al login
            navegar('/login')
        } else {
            // Si está logueado, obtenemos el id del usuario
            setCurrentUser(JSON.parse(window.localStorage.getItem('loggedUser'))._id)
        }
    }, [])

    // Se ejecuta cada vez que cambia el estado de currentUser
    useEffect(() => {
        // Si el usuario esta logueado, conectamos el socket
        if(currentUser) {
            socket.current = io(process.env.REACT_APP_API_BASE_URL);
            socket.current.emit("addUser", currentUser);
        }
    }, [currentUser])

    // Se ejecuta cada vez que cambia el estado de currentUser
    useEffect(() => {
        // Si el usuario esta logueado, obtenemos los contactos
        if(currentUser) {
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
        // Container principal
        <div>
            {/* Tiene que ser una columna que agrupe los contactos uno sobre otros, el changeChat es para saber sobre que contacto se hizo click */}
            <ContactsChat contacts={contacts} changeChat={handleChatChange} />
            {/* En caso de que haya un chat seleccionado se muestran los mensajes y demás, sino se muestra una view vacia o algo */}
            {currentChat === undefined ? (
                // En caso de que no haya un chat seleccionado, colocar una vista lindita
                <div>Selecciona un chat</div>
            ) : (
                // En caso de que haya un chat seleccionado, se muestra el chat
                <ChatContainer currentChat={currentChat} socket={socket} />
            )}
        </div>
    )
}

export default Chat