import { Col, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageContainer from "../../components/PageContainer";

function ReportSelectionPage() {
    return <PageContainer pageName="Reports">
        <Stack gap={5}>
            <Col><Link to="monthly"><Button>View Monthly Reports</Button></Link></Col>
            <Col><Link to="yearly"><Button>View Fiscal Year Reports</Button></Link></Col>
            <Col><Link to="students"><Button>View Student Reports</Button></Link></Col>
        </Stack>
    </PageContainer>

}
export default ReportSelectionPage;