import { useEffect, useState } from "react";
import styled from "styled-components"
import OfflineUsers from "./OfflineUsers";
import ProfilePicture from "./ProfilePicture";

const Contenedor = styled.div`
    display: grid;
    grid-template-rows: 10% 90%;
    overflow: hidden;
    background-color: #0e3928;
    .title {
        color: white;
        font-size: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        padding:20px;
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            display: flex;
            flex-direction: row;
            min-height: 4.2rem;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            .avatar {
                img {
                    width: 32px;
                }
            }
            .username {
                display: flex;
                align-items: center;
                gap: 6px;
                .point {
                    width: 0.6rem;
                    height: 0.5rem;
                    border-radius: 50%;
                    background-color: #0eff46ba;
                }
                h3 {
                    margin: 0;
                    font-size: 1.2rem;
                    color: white;
                }
            }
        }
    }
`;

const ChatUsersConnect = ({ usersConnected, contacts,changeChat }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const usuarios = [];
        usersConnected.forEach(user => {
            const contact = contacts.find(contact => contact._id === user.userId)
            if (contact) {
                usuarios.push(contact)
            }
        })
        setUsers(usuarios)
    }, [usersConnected, contacts])

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Función que se ejecuta cuando se cambia de chat
    const changeChatCurrent = (index, contact) => {
        changeChat(contact);
    };
    return (
        <Contenedor>
            <div className="title">
                <h4>Usuarios en Linea</h4>
            </div>
            { users.length === 0 && <OfflineUsers /> }
            <div className="contacts">
                {users.map((contact, index) => {
                    return (
                        <div key={contact._id} className="contact" onClick={() => changeChatCurrent(index, contact)} >
                            <div className="avatar">
                                <ProfilePicture currentUserImage={contact.profilePicture} px="40px"></ProfilePicture>
                            </div>
                            {/* Nombre del contacto */}
                            <div className="username">
                                <div className="point"></div>
                                <h3>{capitalize(contact.nombre) + " " + capitalize(contact.apellido)}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>


        </Contenedor>
    )
}

export default ChatUsersConnect