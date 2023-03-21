import {Container, Row, Col, Button, Card} from "react-bootstrap"
import LeftArrow from "../icons/caret-left-fill.svg"
import RightArrow from "../icons/caret-right-fill.svg"

import { useState } from "react"

function Calendar() {
    /*
        Contains six rows for the six weeks a month will take up.
        If a day is not part of the month, it is filled in with a zero, otherwise it is filled in with the day value
    */
    const [dates, setDates] = useState([
        [0, 0, 1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30, 31, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ])

    function createWeeks() {
        return (dates ?? []).map((week, idx) => (
            <Row key={week}>
                {week.map(day => (
                    <Col key={day + "_" + idx} className="mb-2">
                        <Card>
                            {day != 0 ? day : null}
                        </Card>
                    </Col>
                ))}
            </Row>
        ))
    }

    return <Container>
        <Row>
            <Col className="d-flex">
                <Button className="mr-3">
                    <img src={LeftArrow}/>
                </Button>
                <h2 className="mr-3">March 2023</h2>
                <Button>
                    <img src={RightArrow}/>
                </Button>
            </Col>
        </Row>
        <Row>
            <Col>Mon</Col>
            <Col>Tue</Col>
            <Col>Wed</Col>
            <Col>Thu</Col>
            <Col>Fri</Col>
            <Col>Sat</Col>
            <Col>Sun</Col>
        </Row>
        {createWeeks()}
    </Container>
}
export default Calendar;