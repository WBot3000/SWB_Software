import {Button, Container, Row, Col, Stack} from "react-bootstrap"
import { useState } from "react";
import NavMenu from "../../components/NavMenu";
import DropdownField from "../../components/DropdownField";
import InlineTextField from "../../components/InlineTextField";

import { toMonetaryValue } from "../../formatting";

function validateMonetaryField(field) {
    let numField = Number(field)
    if(Number.isNaN(field)) {
        console.log("Monetary value must be a number");
    }
    else if(numField < 0) {
        console.log("Monetary field cannot be negative");
    }
    else { //Checks for too many decimals
        let decimalLocation = field.indexOf(".");
        if(decimalLocation != -1 && field.length - decimalLocation - 1 > 2) {
            console.log("Monetary values should have a maximum value of two decimal places.")
        }
        else {
            console.log("Monetary value is good!")
        }
    }
}

function AccountSettingsPage() {

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

    //Fields
    const [budgetField, setBudgetField] = useState(null)
    const [payrateField, setPayrateField] = useState(null)

    //Functions
    //TODO: Add DB functions
    function alterBudgetForSelectedYear() {
        validateMonetaryField(budgetField);
        // let cloneData = []
        // for(let info in yearlyInfo) {
        //     cloneData.push({...info})
        // }
        // cloneData[selectedYearIdx].budget = budgetField
    }

    function alterPayrateForSelectedYear() {
        validateMonetaryField(payrateField);
    }

    return <Container fluid>
        <NavMenu/>
        <Row className="mt-5 mb-4">
            <h1>Account Settings</h1>
        </Row>
        <Row className="mb-4">
            <Col>
                <DropdownField
                    items={[...Array(yearlyInfo.length).keys()]}
                    displayItems={yearlyInfo.map(info => info.year)}
                    selectedItem={yearlyInfo[selectedYearIdx]?.year}
                    setStateFunc={setSelectedYearIdx}
                />
            </Col>
        </Row>
        <Row className="mb-4">
            <p>Budget: {selectedYearIdx ? `${toMonetaryValue(yearlyInfo[selectedYearIdx].budget)}` : "Select a year to see the budget"}</p>
            <InlineTextField label="Set New Budget" controlId="settings.budget"
                setStateFunc={setBudgetField} submitFunc={alterBudgetForSelectedYear} 
                type="number"
                value={budgetField}
                buttonLabel="Set New Budget"
                disabled={!selectedYearIdx}/>
        </Row>
        <Row className="mb-4">
            <p>Payrate: {selectedYearIdx ? `${toMonetaryValue(yearlyInfo[selectedYearIdx].payrate)}/hour` : "Select a year to see the payrate"}</p>
            <InlineTextField label="Set New Payrate" controlId="settings.payrate"
                setStateFunc={setPayrateField} submitFunc={alterPayrateForSelectedYear}
                type="number"
                value={payrateField}
                buttonLabel="Set New Payrate"
                disabled={!selectedYearIdx}/>
        </Row>
        <Row className="mb-4">
            <h2>Student Workers</h2>
        </Row>
        <Row className="mb-4">
            <Stack direction="horizontal" gap={4}>
                <Button>Add Student Worker</Button>
                <Button>Remove Student Worker</Button>
                <Button>Change Unavailability Times</Button>
            </Stack>
        </Row>
        <Row className="mb-4">
            <h2>Schedule Shifts</h2>
        </Row>
        <Row>
            <Stack direction="horizontal" gap={4}>
                <Button>Create New Shift</Button>
                <Button>Delete Shift</Button>
                <Button>Add Shift Exception</Button>
                <Button>Remove Shift Exception</Button>
            </Stack>
        </Row>
    </Container>
}
export default AccountSettingsPage;