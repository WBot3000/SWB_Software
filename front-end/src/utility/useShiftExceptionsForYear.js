import { useState, useEffect } from "react";
import { fetchShiftExceptionsForYear } from "./data";

/*
    Hook for grabbing a user's shift exceptions based on year.
    Takes in a user identifier and year and returns the appropriate yearly info.
*/

export function useShiftExceptionsForYear(id, yearId) {

    const [shiftExceptions, setShiftExceptions] = useState([]);

    useEffect(() => {
        async function setShiftExceptionsAsync() {
            let info = await fetchShiftExceptionsForYear(id, yearId);
            setShiftExceptions(info);
        }
        setShiftExceptionsAsync();
    }, [yearId]);

    return shiftExceptions;
}