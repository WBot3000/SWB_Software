import {Button, Row, Col, Stack} from "react-bootstrap"
import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import DropdownField from "../../components/DropdownField";
import InlineTextField from "../../components/InlineTextField";

import { toMonetaryValue } from "../../formatting";
import { Link } from "react-router-dom";

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

    return <PageContainer pageName="Account Settings">
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
                submittable
                submitFunc={alterPayrateForSelectedYear} buttonLabel="Set New Payrate"/>
        </Row>
        <Row className="mb-4">
            <h2>Student Workers</h2>
        </Row>
        <Row className="mb-4">
            <Stack direction="horizontal" gap={4}>
                <Link to="addstudent"><Button>Add Student Worker</Button></Link>
                <Link to="removestudent"><Button>Remove Student Worker</Button></Link>
                <Link to="changeunavailability"><Button>Change Student Unavailability</Button></Link>
            </Stack>
        </Row>
        <Row className="mb-4">
            <h2>Schedule Shifts</h2>
        </Row>
        <Row>
            <Stack direction="horizontal" gap={4}>
                <Link to="createshift"><Button>Create New Shift</Button></Link>
                <Link to="deleteshift"><Button>Delete Shift</Button></Link>
                <Link to="addshiftexception"><Button>Add Shift Exception</Button></Link>
                <Link to="removeshiftexception"><Button>Remove Shift Exception</Button></Link>
            </Stack>
        </Row>
    </PageContainer>
}
export default AccountSettingsPage;