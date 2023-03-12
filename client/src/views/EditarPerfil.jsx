import NavBar from "../components/NavBar.jsx";
import PerfilForm from "../components/PerfilForm.jsx";

function EditarPerfil(props) {
    return (
        <>
            <NavBar></NavBar>
            <center>
                <div className="Container w-25">
                    <PerfilForm />
                </div>
            </center>
        </>
    );
}

export default EditarPerfil;
