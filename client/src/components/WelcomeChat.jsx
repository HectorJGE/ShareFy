import { useEffect, useState } from "react"
import styled from "styled-components"
import Portada from "./../images/chat.gif"

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
        height: 12rem;
    }
    span {
        color: #4e0eff;
    }
`;

const WelcomeChat = () => {
    const [user, setUser] = useState(undefined)
    useEffect(() => {
        const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
        setUser(loggedUser.nombre + " " + loggedUser.apellido);
    }, [])

    return (
        <Container>
            <img src={Portada} alt="chat animado" />
            <h1>
                Bienvenido <span>{user}!</span>
            </h1>
            <h3>Por favor, selecciona un chat</h3>
        </Container>
    )
}

export default WelcomeChat