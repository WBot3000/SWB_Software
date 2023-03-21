import { useState } from "react";
import { Form, Stack, Row, Col, Button, Modal, ButtonGroup, ToggleButton } from "react-bootstrap";

import { validTimeRange } from "../utility/time";

function TimePicker(props) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [displayTime, setDisplayTime] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [storedHour, setStoredHour] = useState("12");
    const [storedMinute, setStoredMinute] = useState("00");
    const [storedTimeOfDay, setStoredTimeOfDay] = useState("AM");

    function getProperHour(changeTo) {
        if(changeTo == "") { //Lets the user always empty out the field
            return ""
        }
        let numericChangeTo = Number(changeTo)
        //Prevent hours from going lower than 1, higher than 12, and including a decimal point
        if(numericChangeTo < 1 || numericChangeTo > 12 || changeTo.includes(".")) {
            return storedHour;
        }
        return changeTo
    }

    function getProperMinute(changeTo) {
        if(changeTo == "") { //Lets the user always empty out the field
            return ""
        }
        let numericChangeTo = Number(changeTo)
        //Prevent hours from going lower than 1, higher than 12, and including a decimal point
        if(numericChangeTo < 0 || numericChangeTo > 59 || changeTo.includes(".")) {
            return storedMinute;
        }
        //Add padding zero if necessary
        if(numericChangeTo >= 0 && numericChangeTo <= 9) {
            return "0" + numericChangeTo;
        }
        //Boundary case for backspacing when value is between 0 and 9
        let numericStoredMinute = Number(storedMinute);
        if(changeTo == "0" && storedMinute != "" && (numericStoredMinute >= 0 || numericStoredMinute <= 9)) {
            return "";
        }
        //Remove padding zero if necessary
        if(changeTo[0] == "0") {
            return changeTo.substring(1);
        }
        return changeTo;
    }

    function setTime() {
        if(props.setHourFunc) {
            props.setHourFunc(storedHour);
        }
        if(props.setMinuteFunc) {
            props.setMinuteFunc(storedMinute);
        }
        if(props.setTimeOfDayFunc) {
            props.setTimeOfDayFunc(storedTimeOfDay);
        }
        setDisplayTime(storedHour + ":" + storedMinute + " " + storedTimeOfDay);
        setModalIsOpen(false);
    }

    return <>
        <Form.Group className={props.className}>
            <Row>
                <Form.Label column="xs" xs={1}>{props.label}</Form.Label>
                <Col xs="auto">
                    <Form.Control
                        value={displayTime ?? "Select a time"}
                        readOnly
                    />
                </Col>
                <Col>
                    <Button onClick={() => {setModalIsOpen(true)}}>Set</Button>
                </Col>
            </Row>
        </Form.Group>

        <Modal show={modalIsOpen} onHide={() => {setModalIsOpen(false)}}>
            <Modal.Header className="mb-5" closeButton>
                <Modal.Title>{props.label ?? "Set Time"}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mb-5">
                <Form>
                    <Stack direction="horizontal" gap={3} className="mb-5">
                        <Form.Group className={props.className}>
                            <Form.Control 
                                type="number"
                                min={1}
                                max={12}
                                onChange={(e) => {setStoredHour(getProperHour(e.target.value))}}
                                value={storedHour}
                            />
                        </Form.Group>
                        <p>:</p>
                        <Form.Group className={props.className}>
                            <Form.Control
                                type="number"
                                onChange={(e) => {setStoredMinute(getProperMinute(e.target.value))}}
                                value={storedMinute}
                            />
                        </Form.Group>
                        <ButtonGroup>
                            <ToggleButton id="time.am" type="radio" value="AM" checked={storedTimeOfDay === "AM"}
                                onChange={(e) => {setStoredTimeOfDay(e.target.value)}}>
                                AM
                            </ToggleButton>
                            <ToggleButton id="time.pm" type="radio" value="PM" checked={storedTimeOfDay === "PM"}
                                onChange={(e) => {setStoredTimeOfDay(e.target.value)}}>
                                PM
                            </ToggleButton>
                        </ButtonGroup>
                    </Stack>
                </Form>
                <Row>
                    <Col>
                        <Button onClick={setTime}>Select Time</Button>
                    </Col>
                </Row>
                <Row>
                    <p>{errorMsg}</p>
                </Row>
            </Modal.Body>
        </Modal>
    </>
}
export default TimePicker;