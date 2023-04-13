import './actionBox.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { renderWeekRange } from '../../utility/formatting';
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

    return (
        <div className='action-box'>
            <h2 className="mt-3 mb-3 text-center">{renderWeekRange(props.selectWeeks)}</h2>
            <Stack gap={3}>
                <Button className="mx-5 px-3 py-3"
                    disabled={!props.selectWeeks || props.selectWeeks.length == 0}
                    onClick={() => { props.selectWeeks.length > 0 && props.onViewPayroll()}}>
                    Check Payroll Information
                </Button>
                <Button className="mx-5 px-3 py-3"
                    disabled={!props.selectWeeks || props.selectWeeks.length == 0}
                    onClick={() => {props.selectWeeks.length > 0 && props.onViewSchedule()}}>
                    View Selected Schedule
                </Button>
                <Button className="mx-5 px-3 py-3 mb-3"
                    disabled={!props.selectWeeks || props.selectWeeks.length == 0}
                    onClick={() => {props.selectWeeks.length > 0 && props.onViewEmail()}}>
                    Send Confirmation Email
                </Button>
            </Stack>
        </div>
    );
};

export default ActionBox;
