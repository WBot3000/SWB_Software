import {Button, Row, Col, Stack} from "react-bootstrap"
import { useState, useEffect } from "react";
import PageContainer from "../../components/PageContainer";
import DropdownField from "../../components/DropdownField";
import InlineTextField from "../../components/InlineTextField";
import NavButton from "../../components/NavButton";

import { toMonetaryValue } from "../../utility/formatting";
import { validMonetaryValue } from "../../utility/validation";
import { useYearlyInfo } from "../../utility/useYearlyInfo";

function AccountSettingsPage() {
    //State
    //Year data, will be gotten from the database
    const yearlyInfo = useYearlyInfo();

    //Index of the selected year data
    const [selectedYearIdx, setSelectedYearIdx] = useState(null);

    //Fields
    const [budgetField, setBudgetField] = useState(null);
    const [budgetUpdatedMsg, setBudgetUpdatedMsg] = useState("");

    const [payrateField, setPayrateField] = useState(null);
    const [payrateUpdatedMsg, setPayrateUpdatedMsg] = useState("");

    //Functions
    //TODO: Add DB functions (as well as updating data in memory)
    function alterBudgetForSelectedYear() {
        try {
            validMonetaryValue(budgetField, "Budget");
            setBudgetUpdatedMsg("Budget successfully updated!");
        }
        catch(err) {
            console.log(err)
            setBudgetUpdatedMsg(err);
        }
    }

    function alterPayrateForSelectedYear() {
        try {
            validMonetaryValue(payrateField, "Payrate");
            setPayrateUpdatedMsg("Payrate successfully updated!");
        }
        catch(err) {
            setPayrateUpdatedMsg(err);
        }
    }

    function switchYear(switchIdx) {
        setSelectedYearIdx(switchIdx);
        setBudgetField("");
        setBudgetUpdatedMsg("");
        setPayrateField("");
        setPayrateUpdatedMsg("");
    }

    return <PageContainer pageName="Account Settings">
        <Row className="mb-4">
            <Col>
                <DropdownField
                    items={[...Array(yearlyInfo.length).keys()]}
                    itemType="Year"
                    displayItems={yearlyInfo.map(info => info.year)}
                    selectedItem={yearlyInfo[selectedYearIdx]?.year}
                    setStateFunc={switchYear}
                />
            </Col>
        </Row>
        <Row className="mb-4">
            <Col>
                <p>Budget: {selectedYearIdx ? `${toMonetaryValue(yearlyInfo[selectedYearIdx].budget)}` : "Select a year to see the budget"}</p>
                <InlineTextField label="Set New Budget" controlId="settings.budget"
                    setStateFunc={setBudgetField}
                    type="number"
                    value={budgetField}
                    disabled={!selectedYearIdx}
                    submittable
                    submitFunc={alterBudgetForSelectedYear} buttonLabel="Set New Budget"/>
            </Col>
            <Col>
                <p>{budgetUpdatedMsg}</p>
            </Col>
        </Row>
        <Row className="mb-4">
            <Col>
            <p>Payrate: {selectedYearIdx ? `${toMonetaryValue(yearlyInfo[selectedYearIdx].payrate)}/hour` : "Select a year to see the payrate"}</p>
            <InlineTextField label="Set New Payrate" controlId="settings.payrate"
                setStateFunc={setPayrateField}
                type="number"
                value={payrateField}
                disabled={!selectedYearIdx}
                submittable
                submitFunc={alterPayrateForSelectedYear} buttonLabel="Set New Payrate"/>
            </Col>
            <Col>
                <p>{payrateUpdatedMsg}</p>
            </Col>
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
                <NavButton to="addshiftexception">Add Shift Exception</NavButton>
                <NavButton to="removeshiftexception">Remove Shift Exception</NavButton>
            </Stack>
        </Row>
    </PageContainer>
}
export default AccountSettingsPage;