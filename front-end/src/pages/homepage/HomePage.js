import { Row, Col } from "react-bootstrap";
import PageContainer from "../../components/PageContainer";
import CustomCalendar from '../../components/modules/cusCalendar';
import ActionBox from '../../components/modules/actionBox'

import "moment/locale/en-gb";
import { useState, useEffect } from "react";

//Modals
import EmailModal from "./EmailModal";
import WeeklyPayrollModal from "./WeeklyPayrollModal";
import CurSchedule from '../../components/modules/curSchedule'

function HomePage() {

    const [selectWeeks, setSelectWeeks] = useState([])

    const [payrollModalIsOpen, setPayrollModalIsOpen] = useState(false);
    const [scheduleModalIsOpen, setScheduleModalIsOpen] = useState(false);
    const [emailModalIsOpen, setEmailModalIsOpen] = useState(false);

    const handleOk = () => { }

    useEffect(() => {

    }, [])

    return <PageContainer pageName="Welcome, ACCOUNT NAME">
        <Row>
            <Col>
                <CustomCalendar onWeekSelected={(weeks) => setSelectWeeks(weeks)} />
            </Col>
            <Col>
                <ActionBox selectWeeks={selectWeeks}
                    onViewPayroll={() => setPayrollModalIsOpen(true)}
                    onViewSchedule={() => setScheduleModalIsOpen(true)}
                    onViewEmail={() => setEmailModalIsOpen(true)} 
                />
            </Col>
        </Row>

        <WeeklyPayrollModal show={payrollModalIsOpen} closingFunc={() => setPayrollModalIsOpen(false)} selectWeeks={selectWeeks}/>
        <CurSchedule visible={scheduleModalIsOpen} onCancel={() => setScheduleModalIsOpen(false)} selectWeeks={selectWeeks} />
        <EmailModal show={emailModalIsOpen} closingFunc={() => setEmailModalIsOpen(false)} selectWeeks={selectWeeks}/>
    </PageContainer>
}
export default HomePage;