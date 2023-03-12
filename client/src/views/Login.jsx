import React from "react";
import LoginForm from "../components/LoginForm";
import Container from "../utils/responsive";

function Login() {
    return (
        <Container>
            <center>
                <div className="Container w-25">
                    <LoginForm></LoginForm>
                </div>
            </center>
        </Container>
    );
}

export default Login;
