import React, { useState, useEffect } from "react";
import "../css/TraderAccount.css";
import { DatePicker, Menu, Dropdown, Button, Select, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import moment from 'moment';
import {
  format,
  getYear,
  getMonth,
  startOfWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import enIN from "date-fns/locale/en-IN";
import { useParams } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
const { Option } = Select;
const TraderAccount = () => {
  const { id } = useParams();
  const [selectedDate, onDateChange] = useState(null);
  const [totalAmount, setToalAmount] = useState(50000);
  const [userData, setUserData] = useState([]);
  const handleMenuVisibleChange = (visible) => {
    if (!visible) {
      document.getElementById("date-picker-dropdown").click();
    }
  };

  useEffect(() => {
    callApiToAllUserTradingAcountDetails();
    callApiToFetchUserWallet();
  }, []);
  const formatDate = (date) => {
    return date
      ? format(utcToZonedTime(date, "Asia/Kolkata"), "dd MMMM yyyy", {
          locale: enIN,
        })
      : "Select Date";
  };
  const handleDatePickerClick = (e) => {
    e.stopPropagation();
  };
  const handleYearClick = (year) => {
    const selectedYear = new Date(
      year,
      getMonth(selectedDate || new Date()),
      1
    );
    onDateChange(selectedYear);
    const yearStartingDate = format(selectedYear, "dd MMMM yyyy");
    handleMenuVisibleChange(false);
    console.log(selectedYear.getFullYear());
    filterYear(selectedYear.getFullYear())

  };
  const handleMonthClick = (month) => {
    const selectedMonth = new Date(
      getYear(selectedDate || new Date()),
      month,
      1
    );
    onDateChange(selectedMonth);
    const monthStartingDate = format(selectedMonth, "dd MMMM yyyy");
    handleMenuVisibleChange(false);
    console.log("Week Starting Date:", monthStartingDate);
    filterMonth(selectedMonth.getFullYear(), selectedMonth.getMonth()+1);
  };
  const handleWeekClick = (value) => {
    //const selectedWeek = subWeeks(new Date(), week);
    onDateChange(null);
    // Log the starting date of the selected week to the console
    //const weekStartingDate = format(selectedWeek, "dd MMMM yyyy");
    handleMenuVisibleChange(false);
    console.log("Week Starting Date:");
    callApiToAllUserTradingAcountDetails();
    
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
          style={{ minWidth: "120px" }}
          onChange={(year) => handleYearClick(year)}
          onClick={(event) => event.stopPropagation()}
        >
          {Array.from(
            { length: 10 },
            (_, index) => getYear(new Date()) - index
          ).map((year) => (
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
          style={{ minWidth: "120px" }}
          onChange={(month) => handleMonthClick(month)}
          onClick={(event) => event.stopPropagation()}
        >
          {Array.from({ length: 12 }, (_, index) => index).map((month) => (
            <Option key={month} value={month}>
              {format(new Date(0, month), "MMMM")}
            </Option>
          ))}
        </Select>
      </Menu.Item>
      <Menu.Item key="week-select">
        <Select
          placeholder="All"
          // value={
          //   selectedDate
          //     ? format(startOfWeek(selectedDate), "dd MMMM yyyy")
          //     : undefined
          // }
          value="All"
          style={{ minWidth: "120px" }}
          onChange={handleWeekClick}
          onClick={(event) => event.stopPropagation()}
        >
          {Array.from({ length: 1 }, (_, index) => index).map((week) => (
            <Option key={week} value={week}>
              {/* {format(subWeeks(new Date(), week), "dd MMMM yyyy")} */}
              All
            </Option>
          ))}
          
        </Select>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "User ID",
      dataIndex: "userid",
      key: "userid",
    },
    {
      title: 'Amount',
      dataIndex: 'amountAdded',
      key: 'amountAdded',
      render: (amount) => {
        // Format the amount with two decimal places
        const formattedAmount = parseFloat(amount).toFixed(2);
        return <span>₹{formattedAmount}</span>;
      },
    },
   
  ];

  const callApiToAllUserTradingAcountDetails = () => {
    let data = {
      userid: "badal1",
    };
    axios
      .post("/admin/filter-Transactions-With-Year-Month-Week", data)
      .then((res) => {
        setUserData(res.data.allData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterYear = (year) =>{
    let data = {
      userid:"badal1",
      year:year
    }
    axios
      .post("/admin/filter-Transactions-With-Year-Month-Week", data)
      .then((res) => {
        setUserData(res.data.transactions);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const filterMonth = (year, month) =>{
    console.log(year, month)
    let data = {
      userid:"badal1",
      year:year,
      month:month
    }
    axios
      .post("/admin/filter-Transactions-With-Year-Month-Week", data)
      .then((res) => {
        setUserData(res.data.transactions);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const callApiToFetchUserWallet = () =>{
    let data = {
      userid:'badal1'
    }
    axios.post("/admin/fetch-particular-user-details-from-admin-using-userid",data)
    .then((res)=>{
      setToalAmount(res.data.result.tradingWallet);
      console.log(res.data.result.tradingWallet)
    })
    .catch(err=>{
      console.log(err)
    })
  };
  return (
    <>
      <div className="trading-container">
        <div className="header-trading-account">
          <div className="header-trading-content">
            <p>Trader Accounts Details</p>
            <div className="trading-drop-down">
              <div className="total-wallet">
                <FaRupeeSign />
                {totalAmount}
              </div>
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button id="date-picker-dropdown">
                  {selectedDate ? formatDate(selectedDate) : "FILTER"}
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div style={{ height: "500px", overflow: "auto" }}>
          <Table dataSource={userData}

          
             columns={[
              ...columns,
              {
                title: 'Deposit Date',
                dataIndex: 'date',
                key: 'date',
                render: (date) => {
                  // Format the date using moment.js
                  const formattedDate = moment(date).format('YYYY-MM-DD HH:mm');
    
                  return <span>{formattedDate}</span>;
                },
              },
            ]}
          />;
        </div>
      </div>
    </>
  );
};
export default TraderAccount;
