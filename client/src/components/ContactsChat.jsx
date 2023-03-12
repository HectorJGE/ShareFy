import { useState, useEffect } from "react"
import styled from "styled-components";

const Container = styled.div`
    display: grid;
    grid-template-rows: 88% 12%;
    overflow: hidden;
    background-color: #0e3928;
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
        .contact:hover {
            transition: 0.2s;
            background-color: #8B8B8BC8;
        }
        .contact {
            background-color: #4d4d4dc8;
            min-height: 4.2rem;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-in-out;
            .avatar {
                img {
                    height: 2.6rem;
                }
            }
            .username {
                h3 {
                    margin: 0;
                    font-size: 1.2rem;
                    color: white;
                }
            }
        }
        .selected, .selected:hover {
            background-color: #56cb9c;
        }
        
    }

    .current-user {
        background-color: #0c6542;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
        .avatar {
            img {
                height: 2.8rem;
                max-inline-size: 100%;
            }
        }
        .username {
            h2 {
                font-size: 1.4rem;
                color: white;
                margin: 0;
            }
        }
        
        .username:hover {
            h2 {
                opacity: 0.65;
                transition: 0.3s;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }
`;

// Componente que almacenara los contactos del chat
const ContactsChat = ({ contacts, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    const [currentUrl, setCurrentUrl] = useState(undefined)

    useEffect(() => {
        const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
        setCurrentUrl(loggedUser._id);
        setCurrentUserName(loggedUser.nombre + " " + loggedUser.apellido);
        setCurrentUserImage(loggedUser.profilePicture);
    }, [])

    // Función que se ejecuta cuando se cambia de chat
    const changeChatCurrent = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            {currentUserName && (
                <Container>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div key={contact._id}
                                    className={`contact ${index === currentSelected ? "selected" : ""}` }
                                    onClick={() => changeChatCurrent(index, contact)} >
                                    {/* Icono del contacto */}
                                    <div className="avatar">
                                        <img src={contact.profilePicture} alt="userImage" />
                                    </div>
                                    {/* Nombre del contacto */}
                                    <div className="username">
                                        <h3>{capitalize(contact.nombre) + " " + capitalize(contact.apellido)}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Usuario actual */}
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={currentUserImage}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <a className=" text-decoration-none" href={`/perfil/${currentUrl}`}><h2>{currentUserName}</h2></a>
                        </div>
                    </div>
                </Container>
            )}
        </>
    )
}

export default ContactsChat