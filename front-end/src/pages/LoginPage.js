import {Container, Row, Col, Form, Button} from "react-bootstrap"
import TextFormField from "../components/TextFormField";
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //TODO: Replace this with actual function
    function submitLogin() {
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)
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

                    <Container className="text-center">
                        <Button onClick={submitLogin} className="mb-4 w-25 p-2" variant="primary" type="submit">
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