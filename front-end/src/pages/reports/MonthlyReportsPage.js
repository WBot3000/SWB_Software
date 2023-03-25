import { Row, Col } from "react-bootstrap";
import PageContainer from "../../components/PageContainer";
import DropdownField from "../../components/DropdownField";
import MonthlyReport from "../../components/MonthlyReport";

import { useState, useEffect } from "react";
import { fetchMonthlyReportInfo } from "../../utility/data";
import { useYearlyInfo } from "../../utility/useYearlyInfo";

function MonthlyReportsPage() {
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
    }, [selectedYearIdx])

    //Index of the selected monthly budget data
    const [selectedMonthIdx, setSelectedMonthIdx] = useState(null)

    return <PageContainer pageName="Monthly Reports">
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
            <Col xs={10}>
                <DropdownField
                    items={[...Array(monthlyBudgetInfo.length).keys()]}
                    itemType="Month"
                    displayItems={monthlyBudgetInfo.map(mbInfo => mbInfo.month)} //Get monthly values from month data
                    selectedItem={monthlyBudgetInfo[selectedMonthIdx]?.month}
                    setStateFunc={setSelectedMonthIdx}
                    disabled={!selectedYearIdx}
                />
            </Col>
        </Row>
        <MonthlyReport budgetCalendar={monthlyBudgetInfo[selectedMonthIdx]?.budgetCalendar} totalHours={monthlyBudgetInfo[selectedMonthIdx]?.totalHours}/>
    </PageContainer>
}
export default MonthlyReportsPage;