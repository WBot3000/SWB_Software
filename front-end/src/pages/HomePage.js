import { Container, Row, Col, Card, Button, Stack } from "react-bootstrap"
import PageContainer from "../components/PageContainer";
import Calendar from "../components/Calendar";

import { useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {

    const [selectedWeek, setSelectedWeek] = useState(null);

    function getOptionsCard() {
        return <Card>
            {selectedWeek != null ? <h2>Select a week for options.</h2> :
                <>
                    <h2 className="mt-3 mb-3 text-center">3/6/2023 - 3/12/2022</h2>
                    <Stack gap={3}>
                        <Link to="payroll"><Button className="mx-5 px-3 py-3">Check Payroll Information</Button></Link>
                        <Link to="schedule"><Button className="mx-5 px-3 py-3">View Selected Schedule</Button></Link>
                        <Link to="email"><Button className="mx-5 px-3 py-3 mb-3">Send Confirmation Email</Button></Link>
                    </Stack>
                </>
            }
        </Card>
    }

    return <PageContainer pageName="Welcome ACCOUNT_NAME">
        <Row>
            <Col>
                <Calendar/>
            </Col>
            <Col>
                {getOptionsCard()}
            </Col>
        </Row>
    </PageContainer>
}
export default HomePage;