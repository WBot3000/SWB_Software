import './cusCalendar.css'

import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "moment/locale/en-gb"; // 设置语言为英文
import { Button } from 'antd';

const Calendar = (props) => {
  const [currentDate, setCurrentDate] = useState(moment.tz("America/New_York")); // 获取当前纽约时间
  const [monthDays, setMonthDays] = useState([]);
  const [highlightedWeek, setHighlightedWeek] = useState([]);

  useEffect(() => {
    const startOfMonth = moment(currentDate).startOf("month").startOf("week"); // 获取本月第一天所在周的周一
    const endOfMonth = moment(currentDate).endOf("month").endOf("week"); // 获取本月最后一天所在周的周日
    const days = [];
    let day = startOfMonth;

    while (day <= endOfMonth) {
      days.push(day);
      day = moment(day).add(1, "day");
    }

    setMonthDays(days);


  }, [currentDate]);



  const goToPreviousMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month"));
  };

  const isCurrentMonth = (date) => {
    return date.format("YYYY-MM") === currentDate.format("YYYY-MM");
  };

  const handleDayClick = (day) => {
    const startOfWeek = moment(day).startOf("week");
    const endOfWeek = moment(day).endOf("week");
    const weekDays = [];
    let weekDay = startOfWeek;

    while (weekDay <= endOfWeek) {
      weekDays.push(weekDay.format("YYYY-MM-DD"));
      weekDay = moment(weekDay).add(1, "day");
    }

    setHighlightedWeek(weekDays);
    props.onWeekSelected(weekDays)
  }


  return (
    <div className="calendar">
      <div className="header">
        <Button onClick={goToPreviousMonth}>{"<"}</Button>
        <h2>{currentDate.format("MMMM YYYY")}</h2>
        <Button onClick={goToNextMonth}>{">"}</Button>
      </div>
      <div className="weekdays">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>
      <div className="days">
        {monthDays.map((day, index) => (
          <div key={index} className={`day ${isCurrentMonth(day) ? "current-month" : ""} ${highlightedWeek.indexOf(day.format("YYYY-MM-DD")) != -1 ? "highlighted-week" : ""}`} onClick={() => handleDayClick(day)}>
            {day.format("D")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;