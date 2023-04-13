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

//NOTE: Will probably require some user and year identifier
export async function fetchYearlyBudgetInfo(id, yearId) {
    return [
        310.00,
        310.00,
        300.00,
        310.00,
        300.00,
        310.00,
        310.00,
        280.00,
        310.00,
        300.00,
        310.00,
        300.00
    ]
}

//TODO: Fetch all at once, or fetch each time the user makes a request?
//NOTE: When connected to DB, will need to be passed some sort of year identifier so that the appropriate monthly info is collected
//NOTE 2: Remember to take shift exceptions into account when returning this data
export async function fetchMonthlyReportInfo(yearId) {
    return [
        {
            month: "July",
            budgetCalendar: [
                [-1, -1, -1, -1, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [-1, -1, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        },
        {
            month: "August",
            budgetCalendar: [
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        },
        {
            month: "September",
            budgetCalendar: [
                [-1, -1, -1, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        },
        {
            month: "October",
            budgetCalendar: [
                [-1, -1, -1, -1, -1, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, -1, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        },
        {
            month: "November",
            budgetCalendar: [
                [-1, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        },
        {
            month: "December",
            budgetCalendar: [
                [-1, -1, -1, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, -1],
                [-1, -1, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        },
        {
            month: "January",
            budgetCalendar: [
                [-1, -1, -1, -1, -1, -1, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        },
        {
            month: "February",
            budgetCalendar: [
                [-1, -1, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        },
        {
            month: "March",
            budgetCalendar: [
                [-1, -1, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        },
        {
            month: "April",
            budgetCalendar: [
                [-1, -1, -1, -1, -1, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [-1, -1, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        },
        {
            month: "May",
            budgetCalendar: [
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        },
        {
            month: "June",
            budgetCalendar: [
                [-1, -1, -1, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, 10, 10],
                [10, 10, 10, 10, 10, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1]
            ],
            exceptions: [],
            totalHours: 240
        }
    ];
}

//NOTE: Will probably require some week identifier to be passed when made to communicate with backend
export async function fetchBasicStudentInfo() {
    return [
        {
            id: "12345678",
            name: "Student A",
            email: "studenta#gmail.com"
        },
        {
            id: "87654321",
            name: "Student B",
            email: "studentb#gmail.com"
        }
    ];
}


//NOTE: Will probably require some week identifier to be passed when made to communicate with backend
export async function fetchStudentWeeklyScheduleInfo(id, weekStart, weekEnd) {
    return [
        {
            name: "Student A",
            weeklyShifts: {
                regular: [
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
                ],
                special: []
            }
        },
        {
            name: "Student B",
            weeklyShifts: {
                regular: [
                    {
                        name: "Breakfast Duty",
                        type: "regular",
                        start: new Date(2022, 6, 11, 9, 0),
                        end: new Date(2022, 6, 11, 12, 0)
                    },
                    {
                        name: "UCC Floor Cleaning",
                        type: "regular",
                        start: new Date(2022, 6, 15, 12, 0),
                        end: new Date(2022, 6, 15, 15, 0)
                    }
                ],
                special: [
                    {
                        name: "StevensFest",
                        type: "special",
                        start: new Date(2022, 6, 12, 9, 0),
                        end: new Date(2022, 6, 12, 15, 30)
                    }
                ]
            } 
        }
    ];
}

//NOTE: Will require passed fields as well (the student and the month)
export async function fetchStudentMonthlyReportInfo(id, month) {
    return [
        {
            name: "Student A",
            weeklyShifts: {
                regular: [
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
                ],
                special: []
            }
        },
        {
            name: "Student B",
            weeklyShifts: {
                regular: [
                    {
                        name: "Breakfast Duty",
                        type: "regular",
                        start: new Date(2022, 6, 11, 9, 0),
                        end: new Date(2022, 6, 11, 12, 0)
                    },
                    {
                        name: "UCC Floor Cleaning",
                        type: "regular",
                        start: new Date(2022, 6, 15, 12, 0),
                        end: new Date(2022, 6, 15, 15, 0)
                    }
                ],
                special: [
                    {
                        name: "StevensFest",
                        type: "special",
                        start: new Date(2022, 6, 12, 9, 0),
                        end: new Date(2022, 6, 12, 15, 30)
                    }
                ]
            } 
        }
    ];
}

//NOTE: It might be a good idea to have shift IDs for weekly shifts in order to distinguish different shifts from each other
export async function fetchWeeklyShiftsForYear(id, yearId) {
    return [
        {
            name: "Breakfast Duty",
            day: "Monday",
            start: new Date(2022, 6, 4, 9, 0), //NOTE: First three fields in the constructor not really relevant, just need the time. 2022, 6, 4 corresponds to July 4th, 2022, the first Monday of the fiscal year
            end: new Date(2022, 6, 4, 12, 0)
        },
        {
            name: "Lunch Duty",
            day: "Wednesday",
            start: new Date(2022, 6, 4, 9, 0),
            end: new Date(2022, 6, 4, 12, 0)
        },
        {
            name: "UCC Floor Cleaning",
            day: "Friday",
            start: new Date(2022, 6, 1, 12, 0),
            end: new Date(2022, 6, 1, 15, 0)
        }

    ]
}

//NOTE: It might be a good idea to have shift IDs for weekly shifts in order to distinguish different shifts from each other
export async function fetchShiftExceptionsForYear(id, yearId) {
    return [
        {
            shiftName: "Breakfast Duty",
            date: new Date(2023, 1, 20, 0, 0),
            reason: "Festival of Love"
        },
        {
            shiftName: "Breakfast Duty",
            date: new Date(2023, 3, 3, 0, 0),
            reason: "Building Closed"
        },
        {
            shiftName: "UCC Floor Cleaning",
            date: new Date(2022, 11, 23, 0, 0),
            reason: "Building Closed"
        }
    ]
}

//NOTE: It might be a good idea to have shift IDs for weekly shifts in order to distinguish different shifts from each other
//In fact, we'd need it (unless we want to have shifts be unique in name)
export async function fetchShiftExceptionsForShift(id, shiftName) {
    return [
        {
            shiftName: "Breakfast Duty",
            date: new Date(2023, 1, 20, 0, 0),
            reason: "Festival of Love"
        },
        {
            shiftName: "Breakfast Duty",
            date: new Date(2023, 3, 3, 0, 0),
            reason: "Building Closed"
        }
    ]
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
