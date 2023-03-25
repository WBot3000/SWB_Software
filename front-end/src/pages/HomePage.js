import { Row, Col } from "react-bootstrap";
import PageContainer from "../components/PageContainer";
import CustomCalendar from './reports/modules/cusCalendar';
import ActionBox from './reports/modules/actionBox'
import CurSchedule from './reports/modules/curSchedule'

import "moment/locale/en-gb";
import moment from "moment-timezone";
import { useState, useEffect } from "react";

function MonthlyReportsPage() {

    const [selectWeeks, setSelectWeeks] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOk = () => { }

    const renderWeekRange = () => {
        let format = 'D/M/YYYY'
        if (selectWeeks && selectWeeks.length > 0) {
            return <>
                {moment(selectWeeks[0]).format(format)} - {moment(selectWeeks[6]).format(format)}
            </>
        }
    }

    useEffect(() => {

    }, [])

    return <PageContainer pageName="Welcome, ACCOUNT NAME">
        <Row>
            <Col>
                <CustomCalendar onWeekSelected={(weeks) => setSelectWeeks(weeks)} />
            </Col>
            <Col>
                <ActionBox selectWeeks={selectWeeks} onViewSchedule={() => setIsModalOpen(true)} />
            </Col>
        </Row>

        <CurSchedule visible={isModalOpen} onCancel={() => setIsModalOpen(false)} selectWeeks={selectWeeks} />
    </PageContainer>
}
export default MonthlyReportsPage;