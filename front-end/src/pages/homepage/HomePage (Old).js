import { Button, Row, Col, Card, Stack } from "react-bootstrap"
import PageContainer from "../../components/PageContainer";
import Calendar from "../../components/Calendar (Old)";

import { useState } from "react";
import EmailModal from "./EmailModal";
import WeeklyPayrollModal from "./WeeklyPayrollModal";
import WeeklyScheduleModal from "./WeeklyScheduleModal";

function HomePage() {

    const [selectedWeek, setSelectedWeek] = useState(null);

    const [payrollModalIsOpen, setPayrollModalIsOpen] = useState(false);
    const [scheduleModalIsOpen, setScheduleModalIsOpen] = useState(false);
    const [emailModalIsOpen, setEmailModalIsOpen] = useState(false);

    function getOptionsCard() {
        return <Card>
            {selectedWeek != null ? <h2>Select a week for options.</h2> :
                <>
                    <h2 className="mt-3 mb-3 text-center">3/6/2023 - 3/12/2022</h2>
                    <Stack gap={3}>
                        <Button onClick={() => {setPayrollModalIsOpen(true)}} className="mx-5 px-3 py-3">Check Payroll Information</Button>
                        <Button onClick={() => {setScheduleModalIsOpen(true)}} className="mx-5 px-3 py-3">View Selected Schedule</Button>
                        <Button onClick={() => {setEmailModalIsOpen(true)}} className="mx-5 px-3 py-3 mb-3">Send Confirmation Email</Button>
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
        <WeeklyPayrollModal show={payrollModalIsOpen} closingFunc={setPayrollModalIsOpen} week={"3/6/2023 - 3/12/2023"}/>
        <WeeklyScheduleModal show={scheduleModalIsOpen} closingFunc={setScheduleModalIsOpen} week={"3/6/2023 - 3/12/2023"}/>
        <EmailModal show={emailModalIsOpen} closingFunc={setEmailModalIsOpen} week={"3/6/2023 - 3/12/2023"}/>
    </PageContainer>
}
export default HomePage;