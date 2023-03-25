import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchYearlyInfo, fetchMonthlyBudgetInfo, fetchMonthlyStudentInfo } from "../../utility/data";
import DropdownField from "../../components/DropdownField";
import PageContainer from "../../components/PageContainer";
import StudentShiftDisplay from "../../components/StudentShiftDisplay";

function StudentReportsPage() {
    //State
    //Year data, will be gotten from the database
    const [yearlyInfo, setYearlyInfo] = useState([]);

    useEffect(() => {
        async function setYearlyInfoAsync() {
            let info = await fetchYearlyInfo();
            setYearlyInfo(info);
        }
        setYearlyInfoAsync();
    }, [])

    //Index of the selected year data
    const [selectedYearIdx, setSelectedYearIdx] = useState(null);

    //Month data, will be gotten from the database (and will depend on selected year)
    const [monthlyBudgetInfo, setMonthlyBudgetInfo] = useState([]);

    useEffect(() => {
        async function setMonthlyBudgetInfoAsync() {
            let info = await fetchMonthlyBudgetInfo();
            setMonthlyBudgetInfo(info);
        }
        setMonthlyBudgetInfoAsync();
    }, [selectedYearIdx]);

    //Index of the selected year data
    const [selectedMonthIdx, setSelectedMonthIdx] = useState(null);

    //Student information based on the month
    const [studentInfo, setStudentInfo] = useState([]);
    const [selectedStudentIdx, setSelectedStudentIdx] = useState(null);

    useEffect(() => {
        async function setStudentInfoAsync() {
            let info = await fetchMonthlyStudentInfo();
            setStudentInfo(info);
        }
        setStudentInfoAsync();
    }, []);

    function getHoursSummary() {
        return <Container>
            <h3>Select a student to see their working statistics</h3>
        </Container>
    }

    return <PageContainer pageName="Student Reports">
        <Row className="mb-4">
            <Col>
                <DropdownField
                    items={[...Array(yearlyInfo.length).keys()]}
                    itemType="Year"
                    displayItems={yearlyInfo.map(info => info.year)}
                    selectedItem={yearlyInfo[selectedYearIdx]?.year}
                    setStateFunc={setSelectedYearIdx}
                />
            </Col>
            <Col>
                <DropdownField
                    items={[...Array(monthlyBudgetInfo.length).keys()]}
                    itemType="Month"
                    displayItems={monthlyBudgetInfo}
                    selectedItem={monthlyBudgetInfo[selectedMonthIdx]}
                    setStateFunc={setSelectedMonthIdx}
                    disabled={!selectedYearIdx}
                />
            </Col>
            <Col>
                <DropdownField
                    items={[...Array(studentInfo.length).keys()]}
                    itemType="Student"
                    displayItems={studentInfo.map(info => info.name)}
                    selectedItem={studentInfo[selectedStudentIdx]?.name}
                    setStateFunc={setSelectedStudentIdx}
                    disabled={!selectedYearIdx || !selectedMonthIdx}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <StudentShiftDisplay />
            </Col>
            <Col>
                {getHoursSummary()}
            </Col>
        </Row>
    </PageContainer>
}
export default StudentReportsPage;