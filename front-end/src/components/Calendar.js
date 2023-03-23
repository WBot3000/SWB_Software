import {Container, Row, Col, Button, Card} from "react-bootstrap"
import LeftArrow from "../icons/caret-left-fill.svg"
import RightArrow from "../icons/caret-right-fill.svg"

import { useState, useEffect } from "react"
import { months, lastDaysOfMonths, toMonthYear } from "../utility/formatting.js"

//Needed to fix date key issues
import { v4 as uuidv4 } from "uuid";

function Calendar() {
    //Used to keep track of the month and year
    //const [startingDate, setStartingDate] = useState(null);

    //Used to keep track of the month and year the calendar is on
    const [calendarDate, setCalendarDate] = useState(null);

    /*
        Contains six rows for the six weeks a month will take up.
        If a day is not part of the month, it is filled in with a zero, otherwise it is filled in with the day value
    */
    const [dates, setDates] = useState([]);

    //0-5, corresponding to the week the user has clicked on
    const [selectedWeekIdx, setSelectedWeekIdx] = useState(null);

    //Used to set the calendar to its "default state"
    useEffect(() => {
        let baseDate = new Date();
        //Just set it for a day at the beginning of the month. This just makes month changing calculations a lot easier, as we can avoid weird boundary cases with the last days of months
        baseDate.setDate(1);
        setCalendarDate(baseDate);
        let monthArray = createWeekData(baseDate);
        setDates(monthArray);
    }, [])

    function createWeekData(baseDate) {
        //Because our months start at July
        let baseMonth = months[(baseDate.getMonth() + 6) % 12];
        let baseYear = baseDate.getFullYear();
        

        //Get the last day of the month
        //NOTE: This is NOT a date object (since we don't need weekday info), this is just a number
        let lastDayDate = lastDaysOfMonths[(baseDate.getMonth() + 6) % 12];
        //Special logic for February leap years
        if(baseMonth == "February" && (baseYear % 4 == 0 && (baseYear % 100 != 0 || baseYear % 400 == 0))) {
            lastDayDate = 29
        }

        //This section fills out the calendar
        //A zero means a day that isn't part of the month
        let monthArray = [
            [0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];

        //The index to start filling out the month array
        //Usually 0 = Sunday, 6 = Saturday, we need to fix this so that 0 = Monday, 6 = Sunday
        let weekdayIdx = (baseDate.getDay() + 6) % 7;
        let currentWeekIdx = 0;

        //Use to count days 
        let dayCounter = 1;
        //Fill out the calendar
        while(lastDayDate >= dayCounter) {
            //Set the current day
            monthArray[currentWeekIdx][weekdayIdx] = dayCounter
            dayCounter++;
            weekdayIdx++;
            //On a new week
            if(weekdayIdx >= 7) {
                weekdayIdx = 0;
                currentWeekIdx++;
            }
        }

        return monthArray;
    }

    function goBackOneMonth() {
        //This is fine to do since the stored calendar date should always be the 1st (don't have to worry about last day boundary stuff)
        let previousMonth = new Date(calendarDate);
        previousMonth.setMonth(calendarDate.getMonth() - 1);
        let newDates = createWeekData(previousMonth);
        setCalendarDate(previousMonth);
        setDates(newDates);
    }

    function goForwardOneMonth() {
        //This is fine to do since the stored calendar date should always be the 1st (don't have to worry about last day boundary stuff)
        let nextMonth = new Date(calendarDate);
        nextMonth.setMonth(calendarDate.getMonth() + 1);
        let newDates = createWeekData(nextMonth);
        setCalendarDate(nextMonth);
        setDates(newDates);
    }

    function createWeeks() {
        return (dates ?? []).map((week, idx) => (
            <Row /*key={week}*/ key={uuidv4()}>
                {week.map(day => (
                    <Col 
                        key={uuidv4()} 
                        className="mb-2"
                        onClick={() => {setSelectedWeekIdx(idx)}}
                    >
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
                <Button className="mr-3" onClick={goBackOneMonth}>
                    <img src={LeftArrow}/>
                </Button>
                <h2 className="mr-3">{toMonthYear(calendarDate ?? new Date())}</h2>
                <Button onClick={goForwardOneMonth}>
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
        <p>Selected Week: {selectedWeekIdx}</p>
    </Container>
}
export default Calendar;