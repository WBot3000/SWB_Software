export const months = ["July", "August", "September", "October", 
"November", "December", "January", "February", 
"March", "April", "May", "June"]

const MONEY_FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function toMonetaryValue(moneyVal) {
    return MONEY_FORMATTER.format(moneyVal);
}