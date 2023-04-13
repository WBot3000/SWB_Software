/*
    This file contains functions that deal with time (like calculating the difference between two times, or checking to see if one time is after another one).
    All the functions in the file utilize Javascript Date objects.
 */

//Calculates the difference between two times (measured in hours)
export function calculateTimeDiffInHours(startTime, endTime) {
    let diffInMS = endTime.getTime() - startTime.getTime();
    //1000 milliseconds per second, 60 seconds per minute, 60 minutes per hour
    return diffInMS / (1000*60*60)
}

//Wrapper function for determining whether start time is before end time
export function validTimeRange(startTime, endTime) {
    return endTime.getTime() >= startTime.getTime();
}

//Gets the current fiscal year that the user is in as a string
export function getCurrentFiscalYear() {
    let now = new Date();
    let currYear = now.getFullYear();
    let currMonth = now.getMonth();
    //From July - December, this means that you're in the first half of the fiscal year
    if(currMonth > 6) {
        return `July ${currYear} - June ${currYear + 1};`;
    }
    else { //Juanuary - June, the latter half of the fiscal year
        return `July ${currYear - 1} - June ${currYear}`;
    }
}