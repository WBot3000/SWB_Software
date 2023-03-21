import { useEffect, useState } from "react";
import { Form, Stack, Row, Col, Button, Modal} from "react-bootstrap";
import DropdownField from "./DropdownField";

import { months } from "../utility/formatting";

//The number of days in each month. Starts in July and ends in June, just like the years
//Currently, doesn't distinguish between leap years and non leap years
let numDays = [31, 31, 30, 31, 30, 31, 31, 29, 31, 30, 31, 30]

function DatePicker(props) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [displayDate, setDisplayDate] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    //Index of the selected month
    const [storedMonthIdx, setStoredMonthIdx] = useState(null);
    //The selected day
    const [storedDay, setStoredDay] = useState("");

    function getProperDay(changeTo) {
        if(changeTo == "") { //Lets the user always empty out the field
            return ""
        }
        if(changeTo.includes(".")) { //Shouldn't have any decimal places
            return storedDay;
        }
        let numericChangeTo = Number(changeTo)
        if(numericChangeTo < 1) {
            return "1";
        }

        let maxNumDays = numDays[storedMonthIdx];
        if(numericChangeTo > maxNumDays) {
            return "" + maxNumDays //Convert max number of days in the month to a string
        }
        
        return changeTo;
    }

    //This useEffect caps the day value based on the month when the month is switched
    useEffect(() => {
        setStoredDay(getProperDay(storedDay));
    }, [storedMonthIdx]);

    //Sets the date state that the component is being used to set
    function setDate() {
        if(props.setMonthFunc) {
            props.setMonthFunc(storedMonthIdx);
        }
        if(props.setDayFunc) {
            props.setDayFunc(storedDay);
        }
        setModalIsOpen(false);
    }

    return <>
        <Form.Group className={props.className}>
            <Row>
                <Form.Label column="xs" xs={1}>{props.label}</Form.Label>
                <Col xs="auto">
                    <Form.Control
                        value={displayDate ?? "Select a date"}
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
                <Modal.Title>{props.label ?? "Set Date"}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mb-5">
                <Form>
                    <Stack direction="horizontal" gap={3} className="mb-5">
                        <DropdownField
                            items={[...Array(months.length).keys()]}
                            itemType="Month"
                            displayItems={months}
                            selectedItem={months[storedMonthIdx]}
                            setStateFunc={setStoredMonthIdx}
                        />
                        <Form.Group className={props.className}>
                            <Form.Control
                                type="number"
                                onChange={(e) => {setStoredDay(getProperDay(e.target.value))}}
                                value={storedDay}
                                disabled={!storedMonthIdx}
                            />
                        </Form.Group>
                    </Stack>
                </Form>
                <Row>
                    <Col>
                        <Button onClick={setDate}>Select Date</Button>
                    </Col>
                </Row>
                <Row>
                    <p>{errorMsg}</p>
                </Row>
            </Modal.Body>
        </Modal>
    </>
}
export default DatePicker;