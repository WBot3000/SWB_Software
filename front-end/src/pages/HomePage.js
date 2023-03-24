import { Container, Row, Col, Card, Stack } from "react-bootstrap"
import PageContainer from "../components/PageContainer";
import Calendar from "../components/Calendar";

import { useState } from "react";
import NavButton from "../components/NavButton";

function HomePage() {

    const [selectedWeek, setSelectedWeek] = useState(null);

    function getOptionsCard() {
        return <Card>
            {selectedWeek != null ? <h2>Select a week for options.</h2> :
                <>
                    <h2 className="mt-3 mb-3 text-center">3/6/2023 - 3/12/2022</h2>
                    <Stack gap={3}>
                        <NavButton to="payroll" className="mx-5 px-3 py-3">Check Payroll Information</NavButton>
                        <NavButton to="schedule" className="mx-5 px-3 py-3">View Selected Schedule</NavButton>
                        <NavButton to="email" className="mx-5 px-3 py-3 mb-3">Send Confirmation Email</NavButton>
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