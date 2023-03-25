/*
    This file contains functions that fetch the user's data from the backend server, and then alter that data to be usable with the frontend components.
    NOTE: These functions will somewhat depend on how the backend routes are implemented
 */

import axios from "axios";
import moment from 'moment'
const faker = require('faker');


//Currently these are all like mock functions, will be updated once the backend is set up. Right now they just return placeholder data.
//NOTE: Will require weekly identifier
export async function fetchWeeklySchedule() {
    return
}


//NOTE: Will probably require some user identifier to be passed when made to communicate with backend
export async function fetchYearlyInfo() {
    return [
        {
            year: "July 2020 - June 2021",
            budget: 60000,
            payrate: 15
        },
        {
            year: "July 2021 - June 2022",
            budget: 57500,
            payrate: 15.25
        },
        {
            year: "July 2022 - June 2023",
            budget: 72000,
            payrate: 16.50
        }
    ];
}

//NOTE: When connected to DB, will need to be passed some sort of year identifier so that the appropriate monthly info is collected
//Will have objects representing the budgets
export async function fetchMonthlyBudgetInfo(yearId) {
    return [
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June"
    ];
}


//NOTE: Will probably require some week identifier to be passed when made to communicate with backend
export async function fetchWeeklyStudentInfo() {
    return [
        {
            name: "Student A",
            weeklyShifts: [
                {
                    name: "Lunch Duty",
                    type: "regular",
                    start: new Date(2022, 6, 13, 12, 0),
                    end: new Date(2022, 6, 13, 15, 0)
                },
                {
                    name: "Lunch Duty",
                    type: "regular",
                    start: new Date(2022, 6, 14, 12, 0),
                    end: new Date(2022, 6, 14, 15, 0)
                },
                {
                    name: "Lunch Duty",
                    type: "regular",
                    start: new Date(2022, 6, 15, 12, 0),
                    end: new Date(2022, 6, 15, 15, 0)
                }
            ]
        },
        {
            name: "Student B",
            weeklyShifts: [
                {
                    name: "Breakfast Duty",
                    type: "regular",
                    start: new Date(2022, 6, 11, 9, 0),
                    end: new Date(2022, 6, 11, 12, 0)
                },
                {
                    name: "StevensFest",
                    type: "special",
                    start: new Date(2022, 6, 12, 9, 0),
                    end: new Date(2022, 6, 12, 15, 30)
                },
                {
                    name: "UCC Floor Cleaning",
                    type: "regular",
                    start: new Date(2022, 6, 15, 12, 0),
                    end: new Date(2022, 6, 15, 15, 0)
                }
            ]
        }
    ];
}

//NOTE: Will require passed fields as well (the student and the month)
export async function fetchMonthlyStudentInfo() {
    return [
        {
            name: "Student A",
            weeklyShifts: [
                {
                    name: "Lunch Duty",
                    type: "regular",
                    start: new Date(2022, 6, 13, 12, 0),
                    end: new Date(2022, 6, 13, 15, 0)
                },
                {
                    name: "Lunch Duty",
                    type: "regular",
                    start: new Date(2022, 6, 14, 12, 0),
                    end: new Date(2022, 6, 14, 15, 0)
                },
                {
                    name: "Lunch Duty",
                    type: "regular",
                    start: new Date(2022, 6, 15, 12, 0),
                    end: new Date(2022, 6, 15, 15, 0)
                }
            ]
        },
        {
            name: "Student B",
            weeklyShifts: [
                {
                    name: "Breakfast Duty",
                    type: "regular",
                    start: new Date(2022, 6, 11, 9, 0),
                    end: new Date(2022, 6, 11, 12, 0)
                },
                {
                    name: "StevensFest",
                    type: "special",
                    start: new Date(2022, 6, 12, 9, 0),
                    end: new Date(2022, 6, 12, 15, 30)
                },
                {
                    name: "UCC Floor Cleaning",
                    type: "regular",
                    start: new Date(2022, 6, 15, 12, 0),
                    end: new Date(2022, 6, 15, 15, 0)
                }
            ]
        }
    ];
}

//NOTE: student work list
export async function getStudentWorkListById(id) {
    return [

    ];
}

//NOTE: student list
export const getStudentList = () => {
    const getRandomDate = () => {
        return faker.date.between('2023-01-01T00:00:00.000Z', new Date())
    }

    return [
        {
            name: 'Student A',
            id: 'Student A',
            createDate: moment(getRandomDate()).format('D/M/YYYY HH:mm'),
            scheduleNum: 2,
            email: faker.internet.email()
        },
        {
            name: 'Student B',
            id: 'Student B',
            createDate: moment(getRandomDate()).format('D/M/YYYY HH:mm'),
            scheduleNum: 5,
            email: faker.internet.email()
        },
    ];
}
//NOTE: Schedule Shift list
export const getScheduleShiftList = () => {
    const getRandomDate = () => {
        return faker.date.between('2023-01-01T00:00:00.000Z', new Date())
    }

    return [
        {
            name: 'shift 1',
            id: 'shift 1',
            startTime: moment(getRandomDate()).format('D/M/YYYY HH:mm'),
            finishTime: moment(getRandomDate()).format('D/M/YYYY HH:mm'),
            createDate: moment(getRandomDate()).format('D/M/YYYY HH:mm'),
            type: 'Weekly'
        },
        {
            name: 'shift 2',
            id: 'shift 2',
            startTime: moment(getRandomDate()).format('D/M/YYYY HH:mm'),
            finishTime: moment(getRandomDate()).format('D/M/YYYY HH:mm'),
            createDate: moment(getRandomDate()).format('D/M/YYYY HH:mm'),
            type: 'Single Day'
        },
    ];
}
