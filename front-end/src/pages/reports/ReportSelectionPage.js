import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";

function ReportSelectionPage() {
    return <Container fluid>
        <NavMenu/>
        <Row className="mt-5 mb-4">
            <h1>Reports</h1>
        </Row>
        <Stack gap={5}>
            <Col><Button>View Monthly Reports</Button></Col>
            <Col><Button>View Fiscal Year Reports</Button></Col>
            <Col><Button>View Student Reports</Button></Col>
        </Stack>
    </Container>

}
export default ReportSelectionPage;