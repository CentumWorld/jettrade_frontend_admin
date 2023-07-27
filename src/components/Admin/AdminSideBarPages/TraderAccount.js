import React, { useState } from "react";
import "../css/TraderAccount.css";
import { DatePicker, Menu, Dropdown, Button, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { format, getYear, getMonth, startOfWeek, addWeeks } from 'date-fns';
const { Option } = Select;

const TraderAccount = () => {

  const [selectedDate, onDateChange] = useState(null);
  const handleDateChange = (date) => {
    onDateChange(date);
  };

  // Function to format the selected date using date-fns
  const formatDate = (date) => {
    return format(date, 'dd MMMM yyyy'); // Format the date as "27 July 2023"
  };
  

  const menu = (
    <Menu>
      <Menu.Item key="date-picker">
        <DatePicker
          value={selectedDate}
          format="DD MMMM YYYY"
          onChange={handleDateChange}
          style={{ minWidth: '220px' }}
        />
      </Menu.Item>
      <Menu.Item key="year-select">
        <Select
          value={selectedDate ? getYear(selectedDate) : undefined}
          style={{ minWidth: '120px' }}
          onChange={(year) => handleDateChange(new Date(year, getMonth(selectedDate || new Date()), 1))}
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
          value={selectedDate ? getMonth(selectedDate) : undefined}
          style={{ minWidth: '120px' }}
          onChange={(month) =>
            handleDateChange(new Date(getYear(selectedDate || new Date()), month, 1))
          }
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
          value={selectedDate ? format(startOfWeek(selectedDate), 'dd MMMM yyyy') : undefined}
          style={{ minWidth: '120px' }}
          onChange={(week) => handleDateChange(addWeeks(new Date(), week))}
        >
          {Array.from({ length: 10 }, (_, index) => index).map((week) => (
            <Option key={week} value={week}>
              {`${format(addWeeks(new Date(), week), 'dd MMMM yyyy')} - ${format(
                addWeeks(new Date(), week + 1),
                'dd MMMM yyyy'
              )}`}
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
              <Button>
                {selectedDate ? formatDate(selectedDate) : "Select Date"}
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default TraderAccount;
