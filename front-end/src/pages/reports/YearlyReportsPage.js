import PageContainer from "../../components/PageContainer";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import { months, toMonetaryValue } from "../../formatting";

import DropdownField from "../../components/DropdownField";

function YearlyReportsPage() {
    //State
    //Year data, will be gotten from the database
    const [yearlyInfo, setYearlyInfo] = useState([
        {
            year: "July 2020 - June 2021",
            budget: 60000,
            payrate: 15
        },
        {
            year: "July 2021 - June 2022",
            budget: 57500,
            payrate: 15.25
        },
        {
            year: "July 2022 - June 2023",
            budget: 72000,
            payrate: 16.50
        }
    ])
    //Index of the selected year data
    const [selectedYearIdx, setSelectedYearIdx] = useState(null)

    //Monthly breakdown data, TODO: Get this from the database
    const [monthlyBreakdownInfo, setMonthlyBreakdownInfo] = useState([
        310.00,
        350.00,
        275.00,
        350.00,
        350.00,
        400.00,
        420.00,
        380.00,
        295.00,
        380.00,
        310.00,
        300.00
    ])

    //TODO: Get from database
    function getMonthlyBreakdown() {
        if(!selectedYearIdx) {
            return <p>Select a year to see its monthly breakdown.</p>
        }
        else {
            return <ul>
                {monthlyBreakdownInfo.map((monthVal, idx) => (
                    <li key={selectedYearIdx + "_" + monthVal + "_" + idx}>{months[idx]}: {toMonetaryValue(monthVal)}</li>
                ))}
            </ul>
        }
    }

    function getYearlyStats() {
        if(!selectedYearIdx) {
            return <p>Select a year to see its yearly stats.</p>
        }
        else {
            let yearlyTotal = monthlyBreakdownInfo.reduce((val1, val2) => val1 + val2, 0); //Sum all the values
            let budgetRemaining = yearlyInfo[selectedYearIdx].budget - yearlyTotal;
            return <ul>
                <li>Yearly Total: {toMonetaryValue(yearlyTotal)}</li>
                <li>Budget Remaining: {toMonetaryValue(budgetRemaining)}</li>
            </ul>
        }
    }

    return <PageContainer pageName="Yearly Reports">
        <Row className="mb-4">
            <Col>
                <DropdownField
                    items={[...Array(yearlyInfo.length).keys()]}
                    itemType="year"
                    displayItems={yearlyInfo.map(info => info.year)}
                    selectedItem={yearlyInfo[selectedYearIdx]?.year}
                    setStateFunc={setSelectedYearIdx}
                />
            </Col>
        </Row>
        <Row>
            {/*TODO: Switch for custom data*/}
            <Col>
                <h2 className="mb-2">Monthly Breakdown</h2>
                {getMonthlyBreakdown()}
            </Col>
            <Col>
                <h2>Yearly Stats</h2>
                {getYearlyStats()}
            </Col>
        </Row>
    </PageContainer>
}
export default YearlyReportsPage;