import { Card } from "react-bootstrap";
import { daysOfWeek, toMonthDay, toTimeFormat } from "../utility/formatting";
import { calculateTimeDiffInHours } from "../utility/time";

function organizeShifts(shifts=[]) {
    let organizedShifts =[
        [],     //Monday
        [],     //Tuesday
        [],     //Wednesday
        [],     //Thursday
        [],     //Friday
        [],     //Saturday
        []      //Sunday
    ]
    for(let shift of shifts) {
        let shiftDay = (shift.start.getDay() - 1) % 7;
        organizedShifts[shiftDay].push(shift);
    }
    return organizedShifts;
}

function createWeeklyShifts(organizedShifts) {
    return <ul>
        {organizedShifts?.map((shifts, dayIdx) => (
            <li>
                <h3>{daysOfWeek[(dayIdx + 1) % 7]}</h3>
                {/*Gets the individual shifts */}
                <ul>
                    {shifts.map(shift => (
                        <li>
                            <p>{shift.name}: {toTimeFormat(shift.start)} - {toTimeFormat(shift.end)}</p>
                        </li>
                    ))}
                </ul>
            </li>
        ))}
    </ul>
}

function StudentShiftDisplay(props) {

    let regular = props.regular ?? [];
    let special = props.special ?? [];
    const organizedShifts = organizeShifts(regular);
    
    function calculateTotalHours() {
        let total = 0;
        for(let shift of regular) {
            console.log(shift);
            total += calculateTimeDiffInHours(shift.start, shift.end);
        }
        for(let shift of special) {
            console.log(shift);
            total += calculateTimeDiffInHours(shift.start, shift.end);
        }
        return total;
    }

    return <Card>
        <h2>Shifts:</h2>
        {regular && regular.length > 0 ? <>
            <h3>Regular:</h3>
            {createWeeklyShifts(organizedShifts)}
        </> : null}
        {special && special.length > 0 ? <>
            <h3>Special Assignments:</h3>
            <ul>
                {special.map(shift => {
                    let shiftDay = toMonthDay(shift.start);
                    return <li>
                        <p>{`${shift.name} (${shiftDay})`}: {toTimeFormat(shift.start)} - {toTimeFormat(shift.end)}</p>
                    </li>
                })}
            </ul>
        </> : null}
        <h3>Total Hours: {calculateTotalHours()}</h3>
    </Card>
}
export default StudentShiftDisplay;