import React, { useState } from "react";
import "../css/TraderAccount.css";
import { DatePicker, Menu, Dropdown, Button, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { format, getYear, getMonth, startOfWeek, addWeeks, subWeeks } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import enIN from 'date-fns/locale/en-IN';
import { useParams } from "react-router-dom";
const { Option } = Select;
const TraderAccount = () => {
  const { id } = useParams();
  const [selectedDate, onDateChange] = useState(null);
  const handleMenuVisibleChange = (visible) => {
    if (!visible) {
      document.getElementById("date-picker-dropdown").click();
    }
  };
  const formatDate = (date) => {
    return date
      ? format(utcToZonedTime(date, 'Asia/Kolkata'), 'dd MMMM yyyy', { locale: enIN })
      : "Select Date";
  };
  const handleDatePickerClick = (e)=>{
    e.stopPropagation();
  };
  const handleYearClick = (year) => {
    const selectedYear = new Date(year, getMonth(selectedDate || new Date()), 1);
    onDateChange(selectedYear);
    const yearStartingDate = format(selectedYear, 'dd MMMM yyyy');
    handleMenuVisibleChange(false);
    console.log(yearStartingDate);
  };
  const handleMonthClick = (month) => {
    const selectedMonth = new Date(getYear(selectedDate || new Date()), month, 1);
    onDateChange(selectedMonth);
    const monthStartingDate = format(selectedMonth, 'dd MMMM yyyy');
    handleMenuVisibleChange(false);
    console.log("Week Starting Date:", monthStartingDate);
  };
  const handleWeekClick = (week) => {
    const selectedWeek = subWeeks(new Date(), week);
    onDateChange(selectedWeek);
    // Log the starting date of the selected week to the console
    const weekStartingDate = format(selectedWeek, 'dd MMMM yyyy');
    handleMenuVisibleChange(false);
    console.log("Week Starting Date:", weekStartingDate);
  };
  const menu = (
    <Menu onVisibleChange={handleMenuVisibleChange}>
      {/* <Menu.Item key="date-picker">
        <DatePicker
          value={selectedDate}
          format="DD MMMM YYYY"
          onChange={handleDateChange}
          style={{ minWidth: '220px' }}
          onClick={handleDatePickerClick}
        />
      </Menu.Item> */}
      <Menu.Item key="year-select">
        <Select
          placeholder="Year"
          value={selectedDate ? getYear(selectedDate) : undefined}
          style={{ minWidth: '120px' }}
          onChange={(year) => handleYearClick(year)}
          onClick={(event) => event.stopPropagation()}
        >
          {Array.from({ length: 10 }, (_, index) => getYear(new Date()) - index).map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </Menu.Item>
      <Menu.Item key="month-select">
        <Select
          placeholder="Month"
          value={selectedDate ? getMonth(selectedDate) : undefined}
          style={{ minWidth: '120px' }}
          onChange={(month) =>
            handleMonthClick(month)
          }
          onClick={(event) => event.stopPropagation()}
        >
          {Array.from({ length: 12 }, (_, index) => index).map((month) => (
            <Option key={month} value={month}>
              {format(new Date(0, month), 'MMMM')}
            </Option>
          ))}
        </Select>
      </Menu.Item>
      <Menu.Item key="week-select">
        <Select
          placeholder="Week"
          value={selectedDate ? format(startOfWeek(selectedDate), 'dd MMMM yyyy') : undefined}
          style={{ minWidth: '120px' }}
          onChange={(week) => handleWeekClick(week)}
          onClick={(event) => event.stopPropagation()}
        >
          {Array.from({ length: 10 }, (_, index) => index).map((week) => (
            <Option key={week} value={week}>
              {format(subWeeks(new Date(), week), 'dd MMMM yyyy')}
            </Option>
          ))}
        </Select>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className="header-trading-account">
        <div className="header-trading-content">
          <p>Trader Accounts Details</p>
          <div className="trading-drop-down">
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button id="date-picker-dropdown">
                {selectedDate ? formatDate(selectedDate) : "FILTER"}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        {id}
      </div>
    </>
  );
};
export default TraderAccount;