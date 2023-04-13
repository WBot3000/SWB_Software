import {Container, Row, Col, Form, Button} from "react-bootstrap"
import TextFormField from "../components/TextFormField";
import { useState } from "react";
import { Link, redirect } from "react-router-dom";

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginError, setLoginError] = useState("");

    //TODO: Replace this with actual function
    function submitLogin(e) {
        e.preventDefault();
        if(username == "test" && password == "pwd") {
            //TODO: Figure out how to redirect using this function
        }
        else {
            setLoginError("Username or Password is incorrect!");
        }
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
    }

    return <Container>
        <Row>
            <Col className="mt-5">
                <h1 className="text-center">Student Worker Budget Software</h1>
                <Form className="mt-5 border rounded">
                    <h2 className="mt-3 mb-5 mx-5">Login</h2>

                    <TextFormField label="Username" controlId="login.username"
                        setStateFunc={setUsername}/>

                    <TextFormField label="Password" controlId="login.password"
                        setStateFunc={setPassword} type="password"/>

                        <p className="text-center font-weight-bold">{loginError}</p>

                    <Container className="text-center">
                        <Button onClick={(e) => {submitLogin(e)}} className="mb-4 w-25 p-2" variant="primary" type="submit">
                            Login
                        </Button>

                        <p>Need an account? <Link to="/signup">Click here to sign up!</Link></p>
                    </Container>
                </Form>
            </Col>
        </Row>
    </Container>
}
export default LoginPage;