import './curSchedule.css'
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import moment from "moment-timezone";
import "moment/locale/en-gb"; // 设置语言为英文

const faker = require('faker');

const CurSchedule = (props) => {
    const { title, visible, onCancel, onOk } = props;

    const [scheduleList, setScheduleList] = useState([{
        weekTh: "Monday",
        workPlanList: [
            { personName: 'xxx', workDate: '12AM - 2PM' }
        ]
    }])

    const getData = () => {

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const workTimeRanges = ['12AM - 2PM', '2PM - 6PM', '6PM - 9PM'];
        const data = [];

        for (let i = 0; i < 7; i++) {
            const workPlanList = [];
            for (let j = 0; j < 5; j++) {
                workPlanList.push({
                    personName: faker.name.findName(),
                    workDate: faker.random.arrayElement(workTimeRanges),
                });
            }
            data.push({
                weekTh: days[i],
                workPlanList,
            });
        }

        return data
    }

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

    useEffect(() => {
        setScheduleList(getData())
    }, [props.visible])


    return (
        <Modal
            className="cur-schedule"
            title="Current Schedule"
            open={visible}
            onCancel={onCancel}
            onOk={onOk}
        >
            {/* {content} */}
            <div className='schedule-wrap'>
                <h2>{renderWeekRange()}</h2>
                {
                    scheduleList.map((item, index) => <div className="item" key={index}>
                        <div className="title">
                            {item.weekTh}
                        </div>
                        <div className="cont">
                            {
                                item.workPlanList.map((workItem, workIndex) => <div className="schedule-item" key={workIndex}>
                                    <div className="person-name">
                                        ·Student {workItem.personName}
                                    </div>
                                    <div className='work-date'>
                                        {workItem.workDate}
                                    </div>

                                    <span className='change-person'>
                                        Change Student
                                    </span>
                                </div>)
                            }
                        </div>
                    </div>)
                }
            </div>
        </Modal>
    );
};

export default CurSchedule;
