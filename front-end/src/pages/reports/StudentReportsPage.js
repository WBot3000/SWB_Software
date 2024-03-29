import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchMonthlyReportInfo, fetchStudentMonthlyReportInfo } from "../../utility/data";
import DropdownField from "../../components/DropdownField";
import PageContainer from "../../components/PageContainer";
import StudentShiftDisplay from "../../components/StudentShiftDisplay";
import { useYearlyInfo } from "../../utility/useYearlyInfo";

function StudentReportsPage() {
    //State
    //Year data, will be gotten from the database
    const yearlyInfo = useYearlyInfo();

    //Index of the selected year data
    const [selectedYearIdx, setSelectedYearIdx] = useState(null);

    //Month data, will be gotten from the database (and will depend on selected year)
    const [monthlyBudgetInfo, setMonthlyBudgetInfo] = useState([]);

    useEffect(() => {
        async function setMonthlyBudgetInfoAsync() {
            let info = await fetchMonthlyReportInfo();
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
            let info = await fetchStudentMonthlyReportInfo();
            setStudentInfo(info);
        }
        setStudentInfoAsync();
    }, []);

    const regularShifts = studentInfo?.[selectedStudentIdx]?.weeklyShifts?.regular;
    const specialShifts = studentInfo?.[selectedStudentIdx]?.weeklyShifts?.special;

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
                    displayItems={monthlyBudgetInfo.map(mbInfo => mbInfo.month)} //Get monthly values from month data
                    selectedItem={monthlyBudgetInfo[selectedMonthIdx]?.month}
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
                <StudentShiftDisplay regular={regularShifts} special={specialShifts}/>
            </Col>
            <Col>
                {getHoursSummary()}
            </Col>
        </Row>
    </PageContainer>
}
export default StudentReportsPage;