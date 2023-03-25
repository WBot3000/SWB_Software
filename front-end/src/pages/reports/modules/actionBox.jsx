import './actionBox.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import "moment/locale/en-gb";

import { Button, Stack } from "react-bootstrap"


const ActionBox = (props) => {
    const [state, setState] = useState();

    useEffect(() => {
        // effect
        return () => {
            // cleanup
        };
    }, []);

    const handleClick = () => {
        // handle click
    };

    const renderWeekRange = () => {
        let format = 'D/M/YYYY'
        if (props.selectWeeks && props.selectWeeks.length > 0) {
            return <>
                {moment(props.selectWeeks[0]).format(format)} - {moment(props.selectWeeks[6]).format(format)}
            </>
        } else {
            return <>
                unselected
            </>
        }
    }

    return (
        <div className='action-box'>
            <h2 className="mt-3 mb-3 text-center">{renderWeekRange()}</h2>
            <Stack gap={3}>
                <Link to="payroll"><Button className="mx-5 px-3 py-3">Check Payroll Information</Button></Link>
                <a>
                    <Button className="mx-5 px-3 py-3" onClick={() => {
                        props.selectWeeks.length > 0 && props.onViewSchedule()
                    }}>View Selected Schedule</Button>
                </a>
                <Link to="email"><Button className="mx-5 px-3 py-3 mb-3">Send Confirmation Email</Button></Link>
            </Stack>
        </div>
    );
};

export default ActionBox;
