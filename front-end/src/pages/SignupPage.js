import {Container, Row, Col, Form, Button} from "react-bootstrap"
import TextFormField from "../components/TextFormField";
import { useState } from "react";
import { Link } from "react-router-dom";
import { validPassword, validUsername } from "../utility/validation";


function SignupPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const [signupError, setSignupError] = useState("")

    //TODO: Replace this with actual function
    function submitSignup(e) {
        e.preventDefault();
        try {
            validUsername(username);
            validPassword(password);
            if(password != confirmPassword) {
                throw "Error: Passwords don't match!";
            }

            //TODO: This will be replaced with DB call
            console.log(`Username: ${username}`)
            console.log(`Password: ${password}`)
            console.log(`Username: ${confirmPassword}`)
            //

            setSignupError("Signup successful")
        }
        catch(err) {
            setSignupError(err);
        }
    }

    return <Container>
    <Row>
        <Col className="mt-5">
            <h1 className="text-center">Student Worker Budget Software</h1>
            <Form className="mt-5 border rounded">
                <h2 className="mt-3 mb-5 mx-5">Signup</h2>
                <TextFormField label="Username" controlId="login.username"
                    setStateFunc={setUsername}
                    bullets={["Must be at least 4 characters long", 
                    "Must only consist of alphanumeric (A-Z, a-z, 0-9) characters"]}
                />

                <TextFormField label="Password" controlId="login.password"
                    setStateFunc={setPassword}
                    bullets={["Must be at least 6 characters long", 
                    "Must have an uppercase character",
                    "Must have a number",
                    "Must have a special character (`!@#$%^&*()_+-=[]{};':\"\\|,.<>/?~)",
                    "Cannot have any spaces"]}
                    type="password"
                />

                <TextFormField label="Confirm Password" controlId="login.confirm-password"
                    setStateFunc={setConfirmPassword} 
                    bullets={["Make sure it matches the previous password"]}
                    type="password"
                />

                <p className="text-center font-weight-bold">{signupError}</p>


                <Container className="text-center">
                    <Button onClick={(e) => {submitSignup(e)}} className="mb-4 w-25 p-2" variant="primary" type="submit">
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