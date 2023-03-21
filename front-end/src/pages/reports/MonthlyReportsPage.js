import { Row, Col } from "react-bootstrap";
import PageContainer from "../../components/PageContainer";
import DropdownField from "../../components/DropdownField";
import MonthlyReport from "../../components/MonthlyReport";

import { useState, useEffect } from "react";
import { fetchYearlyInfo, fetchMonthlyBudgetInfo } from "../../utility/data";

function MonthlyReportsPage() {
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
    }, [selectedYearIdx])

    //Index of the selected year data
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
                    displayItems={monthlyBudgetInfo}
                    selectedItem={monthlyBudgetInfo[selectedMonthIdx]}
                    setStateFunc={setSelectedMonthIdx}
                    disabled={!selectedYearIdx}
                />
            </Col>
        </Row>
        <Row className="mb-4">
            <MonthlyReport/>
        </Row>
        <Row>
            <h2 className="mb-2">Monthly Stats</h2>
            {/*TODO: Set these values based on the selected data */}
            <p>Month Total: $310.00</p>
            <p>Total Hours: 240</p>
        </Row>
    </PageContainer>
}
export default MonthlyReportsPage;