export const months = ["July", "August", "September", "October", 
"November", "December", "January", "February", 
"March", "April", "May", "June"]

export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", 
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
    let month = months[(date.getMonth() + 6) % 12];
    let dateDay = date.getDate();
    return month + " " + dateDay;
}

//Not really a formatting function, but putting it here for now
export function calculateTimeDiffInHours(startTime, endTime) {
    let diffInMS = endTime.getTime() - startTime.getTime();
    //1000 milliseconds per second, 60 seconds per minute, 60 minutes per hour
    return diffInMS / (1000*60*60)
}