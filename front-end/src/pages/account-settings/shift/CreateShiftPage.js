import { Col, Row } from "react-bootstrap";
import InlineTextField from "../../../components/InlineTextField";
import PageContainer from "../../../components/PageContainer";

function CreateShiftPage() {
    return <PageContainer pageName="Create New Shift">
        <Row>
            <Col>
                <InlineTextField/>
            </Col>
            <Col>
                <InlineTextField/>
            </Col>
            <Col>
                <InlineTextField/>
            </Col>
        </Row>
    </PageContainer>
}
export default CreateShiftPage;