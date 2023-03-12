import React from "react";
import RegistroForm from "../components/RegistroForm";
import Container from "../utils/responsive";

function Registro() {
    return (
        <Container>
            <center>
                <div className="Container w-25">
                    <RegistroForm></RegistroForm>
                </div>
            </center>
        </Container>
    );
}

export default Registro;
