import {Container, Row, Col, Table} from "react-bootstrap"

import { useState } from "react";

function MonthlyReport() {
    /*
        Contains six rows for the six weeks a month will take up.
        If a day is not part of the month, it is filled in with a negative one (since 0 is a valid number in this instance), otherwise it is filled in with the corresponding expense
    */
    const [dailyCosts, setDailyCosts] = useState([
        [-1, -1, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1]
    ])

    function addNonNegatives(arr) {
        let sum = 0;
        for(let num of arr) {
            if(num > 0) {
                sum += num;
            }
        }
        return sum;
    }

    return <Table responsive>
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
            {(dailyCosts ?? []).map((week, weekIdx) => (
                <tr>
                    <td>Week {weekIdx+1}</td>
                    {week.map(amount => (
                        <td>{amount < 0 ? "---" : amount}</td>
                    ))}
                    <td>{addNonNegatives(week)}</td>
                </tr>
            ))}
      </tbody>
    </Table>
}
export default MonthlyReport;