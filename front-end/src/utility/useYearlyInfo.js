import { useState, useEffect } from "react";
import { fetchYearlyInfo } from "./data";
import { getCurrentFiscalYear } from "./time";

/*
    Hook for grabbing a user's yearly information.
    Takes in a user identifier and returns the appropriate yearly info.
    Also should add the current fiscal year if it isn't present in the database. (will depend on what the year objects look like)
*/

export function useYearlyInfo(id) {

    const [yearlyInfo, setYearlyInfo] = useState([]);

    useEffect(() => {
        async function setYearlyInfoAsync() {
            let info = await fetchYearlyInfo();
            let currentFiscYear = getCurrentFiscalYear();
            if(!info.map(yInfo => yInfo.year).includes(currentFiscYear)) { //Checks if the current fiscal year is included
                info.push({
                    year: currentFiscYear,
                    budget: 0,
                    payrate: 0
                });
            }
            setYearlyInfo(info);
        }
        setYearlyInfoAsync();
    }, []);

    return yearlyInfo;
}