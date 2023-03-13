import { Container, Row } from "react-bootstrap";
import NavMenu from "./NavMenu";

function PageContainer(props) {
    return <Container fluid>
        <NavMenu/>
        <Row className="mt-5 mb-4">
            <h1>{props.pageName}</h1>
        </Row>
        {props.children}
    </Container>
}
export default PageContainer;