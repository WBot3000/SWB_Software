//Currently not functioning properly. Should get the size of the window every time it is resized (used for changing orientation stuff)

import { useState, useEffect } from "react";

export function useWindowSize() {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    function getWindowSize() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener("resize", getWindowSize);
        return window.removeEventListener("resize", getWindowSize);
    })

    return {width, height};
}