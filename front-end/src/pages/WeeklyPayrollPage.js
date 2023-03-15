import { Col, Row } from "react-bootstrap";
import DropdownField from "../components/DropdownField";
import PageContainer from "../components/PageContainer";
import { useState } from "react";
import StudentShiftDisplay from "../components/StudentShiftDisplay";

function WeeklyPayrollPage() {

    const [studentInfo, setStudentInfo] = useState([
        {
            name: "Student A",
            weeklyShifts: [
                {
                    name: "Lunch Duty",
                    type: "regular",
                    start: new Date(2022, 6, 13, 12, 0),
                    end: new Date(2022, 6, 13, 15, 0)
                },
                {
                    name: "Lunch Duty",
                    type: "regular",
                    start: new Date(2022, 6, 14, 12, 0),
                    end: new Date(2022, 6, 14, 15, 0)
                },
                {
                    name: "Lunch Duty",
                    type: "regular",
                    start: new Date(2022, 6, 15, 12, 0),
                    end: new Date(2022, 6, 15, 15, 0)
                }
            ]
        },
        {
            name: "Student B",
            weeklyShifts: [
                {
                    name: "Breakfast Duty",
                    type: "regular",
                    start: new Date(2022, 6, 11, 9, 0),
                    end: new Date(2022, 6, 11, 12, 0)
                },
                {
                    name: "StevensFest",
                    type: "special",
                    start: new Date(2022, 6, 12, 9, 0),
                    end: new Date(2022, 6, 12, 15, 30)
                },
                {
                    name: "UCC Floor Cleaning",
                    type: "regular",
                    start: new Date(2022, 6, 15, 12, 0),
                    end: new Date(2022, 6, 15, 15, 0)
                }
            ]
        }
    ]);

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