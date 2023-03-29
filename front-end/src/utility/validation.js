import { lastDaysOfMonths, months } from "./formatting";

/*
    This file contains functions that validate data the user inputs before it gets sent to the server
    If the input is invalid, then the function will throw. Make sure to catch this using try catch. The messages are good for displaying on the page
    NOTE: These functions should match the ones doing the validation on the server
 */
const UPPERCASE_LETTERS = /[A-Z]/
const DIGITS = /[0-9]/
const SPACES = /\s/
const SPECIAL_CHARS = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

export function validUsername(username) {
    if(typeof username !== "string") {
        throw "Error: The username must be a string!";
    }
    let trimmed = username.trim();
    if(trimmed.length === 0) {
        throw "Error: The username cannot be empty!";
    }
    if(username.length < 4) {
        throw "Error: The username must be at least 4 characters long!";
    }
    if(SPECIAL_CHARS.test(username)) {
        throw "Error: The username cannot have special characters and spaces! It should only have alphanumeric characters.";
    }

    return true;
}


export function validPassword(password) {
    if(typeof password !== "string") {
        throw "Error: The password must be a string!";
    }
    let trimmed = password.trim();
    if(trimmed.length === 0) {
        throw "Error: The password cannot be empty!";
    }
    if(password.length < 6) {
        throw "Error: The password should be at least 6 characters long!";
    }
    if(SPACES.test(password)) {
        throw "Error: The password cannot have any spaces!";
    }
    if(!UPPERCASE_LETTERS.test(password)) {
        throw "Error: The password must have at least one uppercase character!";
    }
    if(!DIGITS.test(password)) {
        throw "Error: The password must have at least one numerical character!";
    }
    if(!SPECIAL_CHARS.test(password)) {
        throw "Error: The password must have at least one special character!";
    }

    return true;
}


const STUDENT_ID_PATTERN = /^\d{8}}$/ //Regex for exactly eight digits
//Note: Assumes this field will be read as a string
export function validStudentID(studentID) {
    if(typeof studentID != "string") {
        throw "Student ID must be sent as a string."
    }
    if(studentID.trim() == "") {
        throw "Student ID must not be empty."
    }
    if(studentID.length != 8) {
        throw "Student ID must be 8 characters long."
    }
    if(!STUDENT_ID_PATTERN.test(studentID)) {
        throw "Student ID cannot have non-numeric characters.";
    }
    return true;
}


const MONETARY_VALUE_PATTERN = /^\d+(.\d{2})?$/ //Must be either an integer, or a float with exactly two decimal places (TODO: Allow 0 or 1 decimal places too?)
//Note: Assumes this field will be read as a string
//Note 2: Also assumes no commas or dollar sign in the string
export function validMonetaryValue(moneyVal, valType="Monetary Value") {
    if(typeof moneyVal != "string") {
        throw valType + "  must be sent as a string.";
    }
    if(moneyVal.trim() == "") {
        throw valType + "  must not be empty.";
    }
    if(!MONETARY_VALUE_PATTERN.test(moneyVal)) {
        throw "Invalid " + valType + ". " + valType + " must be non-negative, and must be an integer or have exactly two decimal places.";
    }
    return true;
}


//Note: Assumes this field will be read as a string
export function validFiscalYear(fiscalYear) {
    let fiscalYearComponents = fiscalYear.split(" ");
    //Fiscal year should be split into ["July", year value, "-", "June", year value + 1];
    if(fiscalYearComponents.length() !== 5 || fiscalYearComponents[0] != "July" || fiscalYearComponents[2] != "-" || fiscalYearComponents[3] != "June") {
        throw "Invalid Fiscal Year";
    }
    let startYear = Number(fiscalYearComponents[1]);
    let finishYear = Number(fiscalYearComponents[4]);
    if(Number.isNaN(startYear) || Number.isNaN(finishYear)) {
        throw "Invalid Fiscal Year";
    }
    if(finishYear != startYear + 1) {
        throw "Invalid Fiscal Year";
    }
    return true;
}

const DATE_PATTERN = /^\d$|^(1\d)$|^(2\d)$|^(3[0-1])$/ //Mainly just to make sure any decimals don't slip through the cracks
//Note: Assumes date is a string, while monthIdx is the fiscal-year based (0 = July, 11 = June) index for the month, and year is the fiscal year string
//Note 2: Since this should always be called after validating the year, this function doesn't do any validation on the year parameter (even though it probably should)
export function validDate(date, monthIdx, year) {
    if(monthIdx < 0 || monthIdx > 11) {
        throw "Invalid month selected";
    }
    if(DATE_PATTERN.test(date)) {
        throw "Invalid date selected";
    }
    let dateNum = Number(date);
    let lastDayDate = lastDaysOfMonths[monthIdx]
    if(months[monthIdx] == "February") {
        let yearNum = Number(year.split(" ")[4]);
        if(months[monthIdx] == "February" && (yearNum % 4 == 0 && (yearNum % 100 != 0 || yearNum % 400 == 0))) {
            lastDayDate = 29;
        }
    }
    if(dateNum > lastDaysOfMonths[monthIdx]) {
        throw "Invalid date selected";
    }

    return true;
}


const HOURS_PATTERN = /^([0]?\d)|(1[0-2])$/ //Either 0-9 or 10-12
const MINUTES_PATTERN = /^[0-5]\d$/
//Note: Assumes all fields will be read as strings
export function validTime(hours, minutes, timeOfDay, label="time") {
    if(!HOURS_PATTERN.test(hours)) {
        throw "Invalid hours for " + label;
    }
    if(!MINUTES_PATTERN.test(minutes)) {
        throw "Invalid minutes for " + label;
    }
    if(timeOfDay !== "AM" && timeOfDay != "PM") {
        throw "Invalid time of day for " + label;
    }
    return true;
}


const EMAIL_PATTERN = /^([_\.-]*[A-Za-z\d]+)+@([A-Za-z\d])+\.([A-Za-z\d]){2,}$/
//Note: Assumes this field will be read as a string
export function validEmail(email) {
    if(!EMAIL_PATTERN.test(email)) {
        throw "Invalid email format! Emails must be of the form example@domain.ext, with dashes, periods, and underscores needing to be followed up with an alphanumeric character.";
    }
    return true;
}