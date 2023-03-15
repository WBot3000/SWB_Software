import { Col, Container, Row } from "react-bootstrap";
import DropdownField from "../../components/DropdownField";
import PageContainer from "../../components/PageContainer";
import StudentShiftDisplay from "../../components/StudentShiftDisplay";

function StudentReportsPage() {

    function getHoursSummary() {
        return <Container>
            <h3>Select a student to see their working statistics</h3>
        </Container>
    }

    return <PageContainer pageName="Student Reports">
        <Row className="mb-4">
            <Col>
                <DropdownField/>
            </Col>
            <Col>
                <DropdownField/>
            </Col>
        </Row>
        <Row>
            <Col>
                <StudentShiftDisplay/>
            </Col>
            <Col>
                {getHoursSummary()}
            </Col>
        </Row>
    </PageContainer>
}
export default StudentReportsPage;