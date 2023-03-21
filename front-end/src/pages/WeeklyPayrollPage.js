import { Col, Row } from "react-bootstrap";
import DropdownField from "../components/DropdownField";
import PageContainer from "../components/PageContainer";
import { useState, useEffect } from "react";
import { fetchWeeklyStudentInfo } from "../utility/data";

import StudentShiftDisplay from "../components/StudentShiftDisplay";

function WeeklyPayrollPage() {

    const [studentInfo, setStudentInfo] = useState([]);

    useEffect(() => {
        async function setStudentInfoAsync() {
            let info = await fetchWeeklyStudentInfo();
            setStudentInfo(info);
        }
        setStudentInfoAsync();
    }, [])

    const [selectedStudentIdx, setSelectedStudentIdx] = useState(null);

    let regularShifts = [];
    let specialShifts = [];
    studentInfo[selectedStudentIdx]?.weeklyShifts.forEach(shift => {
        if(shift.type == "regular") {
            regularShifts.push(shift);
        }
        else {
            specialShifts.push(shift);
        }
    });

    return <PageContainer pageName="Payroll for WEEK">
        <Row>
            <Col xs={2}></Col>
            <Col>
                <DropdownField
                    items={[...Array(studentInfo.length).keys()]}
                    itemType="Student"
                    displayItems={studentInfo.map(info => info.name)}
                    selectedItem={studentInfo[selectedStudentIdx]?.name}
                    setStateFunc={setSelectedStudentIdx}
                />
            </Col>
            <Col>
                <StudentShiftDisplay regular={regularShifts} special={specialShifts}/>
            </Col>
            <Col xs={2}></Col>
        </Row>
    </PageContainer>
}
export default WeeklyPayrollPage;