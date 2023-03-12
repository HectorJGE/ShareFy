import NavBar from "../components/NavBar.jsx";
import PerfilForm from "../components/PerfilForm.jsx";
import Container from "../utils/responsive.js";

function EditarPerfil(props) {
    return (
        <Container>
            <NavBar></NavBar>
            <center>
                <div className="Container w-25">
                    <PerfilForm />
                </div>
            </center>
        </Container>
    );
}

export default EditarPerfil;
