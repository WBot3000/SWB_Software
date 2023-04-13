import { Col, Row, Modal } from "react-bootstrap";
import DropdownField from "../../components/DropdownField";
import PageContainer from "../../components/PageContainer";
import { useState, useEffect } from "react";
import { fetchStudentWeeklyScheduleInfo } from "../../utility/data";

import StudentShiftDisplay from "../../components/StudentShiftDisplay";

function WeeklyPayrollModal(props) {

    const [studentInfo, setStudentInfo] = useState([]);

    useEffect(() => {
        async function setStudentInfoAsync() {
            let info = await fetchStudentWeeklyScheduleInfo();
            setStudentInfo(info);
        }
        setStudentInfoAsync();
    }, [])

    const [selectedStudentIdx, setSelectedStudentIdx] = useState(null);

    const regularShifts = studentInfo?.[selectedStudentIdx]?.weeklyShifts?.regular;
    const specialShifts = studentInfo?.[selectedStudentIdx]?.weeklyShifts?.special;

    return <Modal show={props.show} onHide={() => {props.closingFunc(false)}} size="xl" fullscreen="lg-down">
        <Modal.Header closeButton>
            <Modal.Title>{"Payroll for " + (props.week ?? "WEEK")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-5"> 
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
        </Modal.Body>
    </Modal>
}
export default WeeklyPayrollModal;