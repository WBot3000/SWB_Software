import {Container, Row, Col} from "react-bootstrap"

function ErrorPage() {
    return <Container>
        <Row>
            <Col className="mx-5 my-5">
                <h1 className="text-center">Error: Page Not Found</h1>
                <p className="text-center mt-3">Click here to go back to the home page.</p>
            </Col>
        </Row>
    </Container>
}
export default ErrorPage;