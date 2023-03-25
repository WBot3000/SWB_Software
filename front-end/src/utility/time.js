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