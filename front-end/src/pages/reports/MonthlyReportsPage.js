import { Row, Col } from "react-bootstrap";
import PageContainer from "../../components/PageContainer";
import DropdownField from "../../components/DropdownField";
import MonthlyReport from "../../components/MonthlyReport";

import { useState } from "react";

function MonthlyReportsPage() {
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

    //Month data, will be gotten from the database (and will depend on selected year)
    const [monthlyInfo, setMonthlyInfo] = useState([
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June"
    ])
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
                    items={[...Array(monthlyInfo.length).keys()]}
                    itemType="Month"
                    displayItems={monthlyInfo}
                    selectedItem={monthlyInfo[selectedMonthIdx]}
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