import { Col, Form, Row, ButtonGroup, ToggleButton, Stack, Button } from "react-bootstrap";
import InlineTextField from "../../../components/InlineTextField";
import PageContainer from "../../../components/PageContainer";
import DropdownField from "../../../components/DropdownField";
import TimePicker from "../../../components/TimePicker";
import DatePicker from "../../../components/DatePicker";

import { useState } from "react";
import { useYearlyInfo } from "../../../utility/useYearlyInfo";
import { useWindowSize } from "../../../utility/useWindowSize";
import { breakpoints, daysOfWeek, months } from "../../../utility/formatting";
import { validDate, validFiscalYear, validTime } from "../../../utility/validation";
import { addSingleDayShiftDB, addWeeklyShiftDB } from "../../../utility/data";

function CreateShiftPage() {
    const [shiftNameField, setShiftNameField] = useState("");

    const [startHour, setStartHour] = useState(null);
    const [startMinute, setStartMinute] = useState(null);
    const [startTimeOfDay, setStartTimeOfDay] = useState(null);

    const [finishHour, setFinishHour] = useState(null);
    const [finishMinute, setFinishMinute] = useState(null);
    const [finishTimeOfDay, setFinishTimeOfDay] = useState(null);

    const [shiftType, setShiftType] = useState(null);

    const yearlyInfo = useYearlyInfo();
    const [selectedYearIdx, setSelectedYearIdx] = useState(null);

    const [dayOfWeek, setDayOfWeek] = useState(null);

    const [selectedMonthIdx, setSelectedMonthIdx] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    const [addedMsg, setAddedMsg] = useState("");

    const {width, height} = useWindowSize();

    function getAdditionalSettings() {
        if(shiftType == "weekly") {
            return <Form className="mb-5">
                <Form.Group>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Label>Day of the Week</Form.Label>
                        <ButtonGroup vertical={width < breakpoints.lg}>
                            {daysOfWeek.map(day => (
                                <ToggleButton key={day} id={`dayofweek_${day}`} type="radio" value={day} checked={dayOfWeek === day}
                                    onChange={(e) => {setDayOfWeek(e.target.value)}}>
                                    {day}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Stack>
                </Form.Group>
            </Form>
        }
        if(shiftType == "singleday") {
            return <DatePicker
                className="mb-5"
                setMonthFunc={setSelectedMonthIdx}
                setDayFunc={setSelectedDay}
            />
        }
    }

    //TODO: Add DB functionality and input validation
    function submitShift(e) {
        e.preventDefault();
        try {
            validFiscalYear(yearlyInfo[selectedYearIdx].year);
            if(shiftNameField.trim().length == 0) {
                throw "Shift must have a name!";
            }
            validTime(startHour, startMinute, startTimeOfDay, "Start Time");
            validTime(finishHour, finishMinute, finishTimeOfDay, "Finish Time");
            //TODO: Fill out
            if(shiftType == "weekly") {
                //Invalid weekday
                if(!daysOfWeek.includes(dayOfWeek)) {
                    throw "Invalid day of the week."
                }
                //TODO: Fill out
                addWeeklyShiftDB();
            }
            if(shiftType == "singleday") {
                validDate(selectedDay, selectedMonthIdx, yearlyInfo[selectedYearIdx]);
                //TODO: Fill out
                addSingleDayShiftDB();
            }
        }
        catch(err) {
            setAddedMsg(err);
        }
    }

    //TODO: Add year to shift page
    return <PageContainer pageName="Create New Shift">
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
        <Row className="mb-5">
            <Col>
                <InlineTextField label="Shift Name" setStateFunc={setShiftNameField}/>
            </Col>
            <Col>
                <TimePicker label="Start Time" setHourFunc={setStartHour} setMinuteFunc={setStartMinute} setTimeOfDayFunc={setStartTimeOfDay}/>
            </Col>
            <Col>
                <TimePicker label="Finish Time" setHourFunc={setFinishHour} setMinuteFunc={setFinishMinute} setTimeOfDayFunc={setFinishTimeOfDay}/>
            </Col>
        </Row>
        <Form className="mb-5">
            <Form.Check inline id="createshift-weekly" type="radio" label="Weekly" value="weekly"
                name="createshift" onClick={(e) => {setShiftType("weekly")}}/>
            <Form.Check inline id="createshift-singleday" type="radio" label="Single Day" value="singleday"
                name="createshift" onClick={(e) => {setShiftType("singleday")}}/>
        </Form>
        <Row>
            {getAdditionalSettings()}
        </Row>
        <Row>
            <p className="text-center">{addedMsg}</p>
        </Row>
        {shiftType && <Button onClick={(e) => {submitShift(e)}}>Create Shift</Button>}
    </PageContainer>
}
export default CreateShiftPage;