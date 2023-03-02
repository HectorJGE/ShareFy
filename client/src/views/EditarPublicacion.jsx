import NavBar from "../components/NavBar.jsx";
import PublicacionForm from "../components/PublicacionForm.jsx";

function EditarPublicacion(props) {


    return (
        <>
            <NavBar></NavBar>
            <center>
                <div className="Container w-25">
                    <PublicacionForm/>
                </div>
            </center>
        </>
    );
}

export default EditarPublicacion;
