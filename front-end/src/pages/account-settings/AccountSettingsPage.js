import {Button, Row, Col, Stack} from "react-bootstrap"
import { useState, useEffect } from "react";
import PageContainer from "../../components/PageContainer";
import DropdownField from "../../components/DropdownField";
import InlineTextField from "../../components/InlineTextField";
import NavButton from "../../components/NavButton";

import { toMonetaryValue } from "../../utility/formatting";
import { useYearlyInfo } from "../../utility/useYearlyInfo";

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
    const yearlyInfo = useYearlyInfo();

    //Index of the selected year data
    const [selectedYearIdx, setSelectedYearIdx] = useState(null);

    //Fields
    const [budgetField, setBudgetField] = useState(null);
    const [payrateField, setPayrateField] = useState(null);

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

    return <PageContainer pageName="Account Settings">
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
        </Row>
        <Row className="mb-4">
            <p>Budget: {selectedYearIdx ? `${toMonetaryValue(yearlyInfo[selectedYearIdx].budget)}` : "Select a year to see the budget"}</p>
            <InlineTextField label="Set New Budget" controlId="settings.budget"
                setStateFunc={setBudgetField}
                type="number"
                value={budgetField}
                disabled={!selectedYearIdx}
                submittable
                submitFunc={alterBudgetForSelectedYear} buttonLabel="Set New Budget"/>
        </Row>
        <Row className="mb-4">
            <p>Payrate: {selectedYearIdx ? `${toMonetaryValue(yearlyInfo[selectedYearIdx].payrate)}/hour` : "Select a year to see the payrate"}</p>
            <InlineTextField label="Set New Payrate" controlId="settings.payrate"
                setStateFunc={setPayrateField}
                type="number"
                value={payrateField}
                disabled={!payrateField}
                submittable
                submitFunc={alterPayrateForSelectedYear} buttonLabel="Set New Payrate"/>
        </Row>
        <Row className="mb-4">
            <h2>Student Workers</h2>
        </Row>
        <Row className="mb-4">
            <Stack direction="horizontal" gap={4}>
                <NavButton to="addstudent">Add Student Worker</NavButton>
                <NavButton to="removestudent">Remove Student Worker</NavButton>
                <NavButton to="changeunavailability">Change Student Unavailability</NavButton>
            </Stack>
        </Row>
        <Row className="mb-4">
            <h2>Schedule Shifts</h2>
        </Row>
        <Row>
            <Stack direction="horizontal" gap={4}>
                <NavButton to="createshift">Create New Shift</NavButton>
                <NavButton to="deleteshift">Delete Shift</NavButton>
                <NavButton to="adddayexception">Add Day Exception</NavButton>
                <NavButton to="removedayexception">Remove Day Exception</NavButton>
            </Stack>
        </Row>
    </PageContainer>
}
export default AccountSettingsPage;