import {Container, Row, Col, Card, Button, Stack} from "react-bootstrap"
import Calendar from "../components/Calendar";
import NavMenu from "../components/NavMenu";

import { useState } from "react";
import MonthlyReport from "../components/MonthlyReport";

function HomePage() {

    const [selectedWeek, setSelectedWeek] = useState(null);

    function getOptionsCard() {
        return <Card>
            {selectedWeek != null ? <h2>Select a week for options.</h2> :
                <>
                    <h2 className="mt-3 mb-3 text-center">3/6/2023 - 3/12/2022</h2>
                    <Stack gap={3}>
                        <Button className="mx-5 px-3 py-3">Check Payroll Information</Button>
                        <Button className="mx-5 px-3 py-3">View Selected Schedule</Button>
                        <Button className="mx-5 px-3 py-3 mb-3">Send Confirmation Email</Button>
                    </Stack>
                </>
            }
        </Card>
    }

    return <Container fluid>
        <NavMenu/>
        <Row className="mb-4">
            <Col className="mt-5">
                <h1>Welcome ACCOUNT_NAME</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Calendar/>
            </Col>
            <Col>
                {getOptionsCard()}
            </Col>
        </Row>
        <Row>
            <Col>
                <MonthlyReport/>
            </Col>
        </Row>
    </Container>
}
export default HomePage;