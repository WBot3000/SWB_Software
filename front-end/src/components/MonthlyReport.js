import { Row, Table } from "react-bootstrap"

import { useState } from "react";
import { toMonetaryValue } from "../utility/formatting";

const emptyReport = [
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1]
]

function MonthlyReport(props) {
    /*
        Report data should contain six rows for the six weeks a month will take up.
        If a day is not part of the month, it is filled in with a negative one (since 0 is a valid number in this instance), otherwise it is filled in with the corresponding expense
    */

    //Note: Do not add negative numbers, as they have special meanings
    function addWeek(arr) {
        let sum = 0;
        for(let num of arr) {
            if(num > 0) {
                sum += num;
            }
        }
        return sum;
    }

    function addMonth() {
        let monthSum = 0;
        for(let week of (props.budgetCalendar ?? [])) {
            monthSum += addWeek(week);
        }
        return monthSum
    }

    return <>
        <Row className="mb-4">
            <Table responsive>
                <thead>
                    <tr>
                        <th>Week</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {(props.budgetCalendar ?? emptyReport).map((week, weekIdx) => (
                        <tr>
                            <td>Week {weekIdx+1}</td>
                            {week.map(amount => (
                                <td>{amount < 0 ? "---" : toMonetaryValue(amount)}</td>
                            ))}
                            <td>{toMonetaryValue(addWeek(week))}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Row>
        <Row>
            <h2 className="mb-2">Monthly Stats</h2>
            {/*TODO: Set these values based on the selected data */}
            <p>Month Total: {toMonetaryValue(addMonth())}</p>
            <p>Total Hours: {props.totalHours ?? 0}</p>
        </Row>
    </>
}
export default MonthlyReport;