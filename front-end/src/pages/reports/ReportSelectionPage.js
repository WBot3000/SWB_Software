import { Col, Button, Stack } from "react-bootstrap";
import NavButton from "../../components/NavButton";
import PageContainer from "../../components/PageContainer";

function ReportSelectionPage() {
    return <PageContainer pageName="Reports">
        <Stack gap={5}>
            <Col><NavButton to="monthly">View Monthly Reports</NavButton></Col>
            <Col><NavButton to="yearly">View Fiscal Year Reports</NavButton></Col>
            <Col><NavButton to="students">View Student Reports</NavButton></Col>
        </Stack>
    </PageContainer>

}
export default ReportSelectionPage;