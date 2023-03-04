import {Container, Row, Col, Form, Button} from "react-bootstrap"

function LoginPage() {
    return <Container>
        <Row>
            <Col className="mt-5">
                <h1 className="text-center">Student Worker Budget Software</h1>
                <Form className="mt-5 border rounded">
                    <h2 className="mt-3 mb-5 mx-5">Login</h2>
                    <Form.Group className="mb-5 mx-5" controlId="login.username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>

                    <Form.Group className="mb-5 mx-5" controlId="login.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"/>
                    </Form.Group>

                    <Container className="text-center">
                        <Button className="mb-4 w-25 p-2" variant="primary" type="submit">
                            Login
                        </Button>

                        <p>Need an account? Click here to sign up!</p>
                    </Container>
                </Form>
            </Col>
        </Row>
    </Container>
}
export default LoginPage;