const MONEY_FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function toMonetaryValue(moneyVal) {
    return MONEY_FORMATTER.format(moneyVal);
}