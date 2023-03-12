import NavBar from "../components/NavBar.jsx";
import PublicacionForm from "../components/PublicacionForm.jsx";
import Container from "../utils/responsive.js";

function EditarPublicacion(props) {
    return (
        <Container>
            <NavBar></NavBar>
            <center>
                <div className="Container w-25">
                    <PublicacionForm />
                </div>
            </center>
        </Container>
    );
}

export default EditarPublicacion;
