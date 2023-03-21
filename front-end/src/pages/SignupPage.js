import {Container, Row, Col, Form, Button} from "react-bootstrap"
import TextFormField from "../components/TextFormField";
import { useState } from "react";
import { Link } from "react-router-dom";


function SignupPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    //TODO: Replace this with actual function
    function submitSignup() {
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)
        console.log(`Username: ${confirmPassword}`)
        console.log(password == confirmPassword)
    }

    return <Container>
    <Row>
        <Col className="mt-5">
            <h1 className="text-center">Student Worker Budget Software</h1>
            <Form className="mt-5 border rounded">
                <h2 className="mt-3 mb-5 mx-5">Signup</h2>
                <TextFormField label="Username" controlId="login.username"
                    setStateFunc={setUsername}
                    bullets={["Username Requirement 1", "Username Requirement 2"]}
                />

                <TextFormField label="Password" controlId="login.password"
                    setStateFunc={setPassword}
                    bullets={["Password Requirement 1", "Password Requirement 2"]}
                    type="password"
                />

                <TextFormField label="Confirm Password" controlId="login.confirm-password"
                    setStateFunc={setConfirmPassword} 
                    bullets={["Make sure it matches the previous password"]}
                    type="password"
                />


                <Container className="text-center">
                    <Button onClick={submitSignup} className="mb-4 w-25 p-2" variant="primary" type="submit">
                        Create Account
                    </Button>

                    <p>Already have an account? <Link to="/login">Click here to log in!</Link></p>
                </Container>
            </Form>
        </Col>
    </Row>
</Container>
}
export default SignupPage;