import moment from "moment-timezone";

/*
    This file contains data and functions that help with formatting the data on the front end.
 */

//Breakpoint boundaries from sm - xxl in pixels
//If we want to alter the default breakpoints for any reason, use this (turn values into an array)
export const breakpoints = {
    sm: 576, 
    md: 768, 
    lg: 992, 
    xl: 1200, 
    xxl: 1400
}

export const months = ["July", "August", "September", "October", 
"November", "December", "January", "February", 
"March", "April", "May", "June"]

//Converts a numerical representation of a month from the standard notation (0 = January, 11 = December), to the fiscal year notation (0 = July, 11 = June)
//Note: This can also be used in the reverse order too since 6 is half of 12
export function standardToFiscalMonthIdx(idx) {
    return (idx + 6) % 12;
}

//Starts at July just like the months do
//Use separate logic to check for February leap years
export const lastDaysOfMonths = [31, 31, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30];

export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", 
"Thursday", "Friday", "Saturday", "Sunday"]

const MONEY_FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

//Takes in a number and returns a currency string
export function toMonetaryValue(moneyVal) {
    return MONEY_FORMATTER.format(moneyVal);
}

//Takes in Javascript Date and returns an appropriate time string
export function toTimeFormat(date) {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let timeOfDay = hour < 12 ? "AM" : "PM";
    if(hour > 12) {
        hour -= 12;
    }
    if(hour == 0) {
        hour = 12;
    }

    return hour + ":" + (minutes < 10 ? "0" : "") + minutes + " " + timeOfDay;
}

//Takes in Javascript Date and returns an appropriate string containing the month and day
export function toMonthDay(date) {
    //Since getMonth returns 0 for January, 1 for February, etc., the returned value needs to be offset by 6 to match how the months are laid out in the months array
    let month = months[standardToFiscalMonthIdx(date.getMonth())];
    let dateDay = date.getDate();
    return month + " " + dateDay;
}

//Converts a Javascript date to a month and year string
export function toMonthYear(date) {
    //Same logic as in toMonthDay
    let month = months[standardToFiscalMonthIdx(date.getMonth())];
    let dateYear = date.getFullYear();
    return month + " " + dateYear
}

const date_format = 'M/D/YYYY'
export function renderWeekRange(selectWeeks) {
    if (selectWeeks && selectWeeks.length > 0) {
        return `${moment(selectWeeks[0]).format(date_format)} - ${moment(selectWeeks[6]).format(date_format)}`
    } else {
        return "Select a Week"
    }
}