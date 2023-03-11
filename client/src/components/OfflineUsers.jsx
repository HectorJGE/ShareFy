import OfflineImg from './../images/offline.png'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 70px;
    img {
        width: 132px;
    }

    p {
        font-size: 1.1rem;
        color: white;
        font-style: italic;
    }
`
const OfflineUsers = () => {
    return (
        <Container >
            {/* Img con un texto */}
            <img src={OfflineImg} alt="offline" />
            <p>No hay ningún usuario en línea</p>
        </Container>
    )
}

export default OfflineUsers