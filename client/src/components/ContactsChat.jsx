import { useState, useEffect } from "react"
import styled from "styled-components";
import ProfilePicture from "./ProfilePicture";

const Container = styled.div`
    .btn-collapse{
        @media screen and (min-width: 720px){
            display:none;
        }
    }
    display: grid;
    grid-template-rows: 88% 12%;
    overflow: hidden;
    
    @media screen and (min-width: 720px){
        background-color: #0e3928;
    }     
    @media screen and (max-width: 720px){
        display:block
    }     
    .contacts {
        
        @media screen and (min-width: 720px){
            display:flex
        }     
        
        @media screen and (max-width: 720px){
            max-height:200px
        }   
        background-color: #0e3928;
        padding-top:1rem;
        flex-direction: column;
        overflow: auto;
        gap: 0.4rem;
        
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
            
            @media screen and (max-width: 720px){
                margin-bottom:0.5rem;
            }     
            background-color: #4d4d4dc8;
            min-height: 4.2rem;
            cursor: pointer;
            width: 95%;
            border-radius: 0.2rem;
            padding: 1rem;
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
        justify-content: start;
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
        @media screen and (max-width: 1080px) {
            height:100%;
            display:none;
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
                    <div className="btn-collapse">
                        <button className="btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Chats
                        </button>
                    </div>
                    <div className="contacts collapse" id="collapseExample">
                        {contacts.map((contact, index) => {
                            return (
                                <div key={contact._id}
                                    className={`mx-auto contact ${index === currentSelected ? "selected" : ""}` }
                                    onClick={() => changeChatCurrent(index, contact)} >
                                    {/* Icono del contacto */}
                                    <div className="avatar">
                                        <ProfilePicture currentUserImage={contact.profilePicture} px="40px"></ProfilePicture>
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
                    <div className="current-user ">
                        <div className="avatar ms-3">
                            <ProfilePicture currentUserImage={currentUserImage} px="50px"></ProfilePicture>
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