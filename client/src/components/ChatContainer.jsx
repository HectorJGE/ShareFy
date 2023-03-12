// Almacenara el chat junto con el formulario para enviar mensajes
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
// import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { addMessageRoute, getMessageRoute } from "./../utils/APIRoutes";
import ProfilePicture from "./ProfilePicture";

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 77.8% 12.2%;
    gap: 0.1rem;
    overflow: hidden;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-rows: 15% 70% 15%;
    }

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 2.5rem;
                }
            }
            .username {
                h3 {
                    font-size: 1.3rem;
                    color: white;
                    margin: 0;
                }
            }
        }
    }

    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .message {
            display: flex;
            align-items: center;

            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;

                p {
                    margin: 0;
                }

                @media screen and (min-width: 720px) and (max-width: 1080px) {
                    max-width: 70%;
                }
            }
        }

        .sended {
            justify-content: flex-end;

            .content {
                background-color: #2c6951;
                p {
                    color: white;
                }
            }
        }

        .recieved {
            justify-content: flex-start;
            .content {
                background-color:#90b3a920;
                p {
                    color: white;
                }
            }
        }
    }
`;


const ChatContainer = ({ currentChat, socket }) => {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    // Se ejecuta cada vez que cambia el estado de currentChat y usamos para recuperar los mensajes
    useEffect(() => {
        const data = JSON.parse(window.localStorage.getItem('loggedUser'));
        axios.post(`${getMessageRoute}`, {
            from: data._id,
            to: currentChat._id,
        })
            .then(res => {
                setMessages(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [currentChat])

    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await JSON.parse(localStorage.getItem('loggedUser'))._id;
            }
        };
        getCurrentChat();
    }, [currentChat]);

    // Se ejecuta cuando se envia un mensaje
    const handleSendMsg = (msg) => {
        const data = JSON.parse(window.localStorage.getItem('loggedUser'));
        socket.current.emit("sendMessage", {
            to: currentChat._id,
            from: data._id,
            msg,
        });
        axios.post(addMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("getMessage", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, [socket]);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <ProfilePicture currentUserImage={currentChat.profilePicture} px="50px"></ProfilePicture>
                    </div>
                    <div className="username">
                        <a className=" text-decoration-none" href={`/perfil/${currentChat._id}`}>
                        <h3>{capitalize(currentChat.nombre) + " " + capitalize(currentChat.apellido)}</h3>
                        </a>
                    </div>
                </div>
                {/* <Logout /> */}
            </div>
            <div className="chat-messages">
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`} >
                                <div className="content ">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    )
}

export default ChatContainer