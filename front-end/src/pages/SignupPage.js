import {Container, Row, Col, Form, Button} from "react-bootstrap"

function SignupPage() {
    return <Container>
    <Row>
        <Col className="mt-5">
            <h1 className="text-center">Student Worker Budget Software</h1>
            <Form className="mt-5 border rounded">
                <h2 className="mt-3 mb-5 mx-5">Signup</h2>
                <Form.Group className="mb-3 mx-5" controlId="signup.username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"/>
                    <Form.Text className="text-muted">
                        <ul className="mt-2">
                            <li>Username Requirement 1</li>
                            <li>Username Requirement 2</li>
                        </ul>
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 mx-5" controlId="signup.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"/>
                    <Form.Text className="text-muted">
                        <ul className="mt-2">
                            <li>Password Requirement 1</li>
                            <li>Password Requirement 2</li>
                        </ul>
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 mx-5" controlId="signup.reenter-password">
                    <Form.Label>Re-Enter Password</Form.Label>
                    <Form.Control type="password"/>
                    <Form.Text className="text-muted">
                        <ul className="mt-2">
                            <li>Make sure it matches the previous password</li>
                        </ul>
                    </Form.Text>
                </Form.Group>

                <Container className="text-center">
                    <Button className="mb-4 w-25 p-2" variant="primary" type="submit">
                        Create Account
                    </Button>

                    <p>Already have an account? Click here to log in!</p>
                </Container>
            </Form>
        </Col>
    </Row>
</Container>
}
export default SignupPage;