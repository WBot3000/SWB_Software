import { Col, Form, Row, ButtonGroup, ToggleButton, Stack } from "react-bootstrap";
import InlineTextField from "../../../components/InlineTextField";
import PageContainer from "../../../components/PageContainer";
import TimePicker from "../../../components/TimePicker";
import DatePicker from "../../../components/DatePicker";

import { useState } from "react";
import { useWindowSize } from "../../../utility/useWindowSize";
import { breakpoints, daysOfWeek } from "../../../utility/formatting";

function CreateShiftPage() {

    const [shiftNameField, setShiftNameField] = useState("");

    const [startHour, setStartHour] = useState(null);
    const [startMinute, setStartMinute] = useState(null);
    const [startTimeOfDay, setStartTimeOfDay] = useState(null);

    const [finishHour, setFinishHour] = useState(null);
    const [finishMinute, setFinishMinute] = useState(null);
    const [finishTimeOfDay, setFinishTimeOfDay] = useState(null);

    const [shiftType, setShiftType] = useState(null);

    const [dayOfWeek, setDayOfWeek] = useState(null);
    //const [selectedYearIdx, setSelectedYearIdx] = useState(null);

    //TODO: State for single day field
    const [selectedMonthIdx, setSelectedMonthIdx] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    const {width, height} = useWindowSize();

    function getAdditionalSettings() {
        if(shiftType == "weekly") {
            return <Form>
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
                setMonthFunc={setSelectedMonthIdx}
                setDayFunc={setSelectedDay}
            />
        }
    }

    return <PageContainer pageName="Create New Shift">
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
    </PageContainer>
}
export default CreateShiftPage;