import React, { useEffect, useState } from "react";
import "../css/NewRenewal.css";
import { Menu, Table } from "antd";
import axios from "axios";
import moment from 'moment';

const NewRenewal = () => {
  const [newsUser, setNewuser] = useState([]);
  const [renewalUser, setRenewalUser] = useState([]);
  const [divChange, setDivChange] = useState(true);
  const handleMenuSelect = (item) => {
    console.log("Selected menu item:", item.key);
    if (item.key === "newaccount") {
      setDivChange(true);
    } else {
      setDivChange(false);
    }
  };

  useEffect(() => {
    callApiToNewAccounts();
    callApiToRenewalUser();
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userid",
      key: "userid",
    },
    {
        title: 'Amount',
        dataIndex: 'activationAmount',
        key: 'activationAmount',
        render: (activationAmount) => {
          // Format the amount with two decimal places
          const formattedAmount = parseFloat(activationAmount).toFixed(2);
          return <span>₹{formattedAmount}</span>;
        },
    },
   
  ];
  const columnsRenewal = [
    {
      title: "User ID",
      dataIndex: "userid",
      key: "userid",
    },
    {
        title: 'Amount',
        dataIndex: 'renewalAmount',
        key: 'renewalAmount',
        render: (renewalAmount) => {
          // Format the amount with two decimal places
          const formattedAmount = parseFloat(renewalAmount).toFixed(2);
          return <span>₹{formattedAmount}</span>;
        },
    },
  
  ];

  const callApiToNewAccounts = () => {
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post("/admin/fetch-all-new-paid-user",config)
      .then((res) => {
        console.log(res.data.data);
        setNewuser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callApiToRenewalUser = () => {
    const token = localStorage.getItem('adminToken')
    let config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios
      .post("/admin/admin-fetch-all-renewal-user",config)
      .then((res) => {
        console.log(res);
        setRenewalUser(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="new-renewal-container">
        <div className="new-renewal-header">
          <div className="new-renewal-content">
            <p>New/Renewal Users</p>
          </div>
          <div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["home"]}
              onSelect={handleMenuSelect}
            >
              <Menu.Item key="newaccount">New Account</Menu.Item>
              <Menu.Item key="renewal">Renewal</Menu.Item>
            </Menu>
          </div>
          {divChange ? (
            <div>
              <Table dataSource={newsUser} columns={[
              ...columns,
              {
                title: 'Deposit Date',
                dataIndex: 'activationDate',
                key: 'activationDate',
                render: (activationDate) => {
                  // Format the date using moment.js
                  const formattedDate = moment(activationDate).format('YYYY-MM-DD HH:mm');
    
                  return <span>{formattedDate}</span>;
                },
              },
            ]} />
            </div>
          ) : (
            <Table dataSource={renewalUser} 
            //columns={columnsRenewal} 
            columns={[
                ...columnsRenewal,
                {
                  title: 'Deposit Date',
                  dataIndex: 'renewalDate',
                  key: 'renewalDate',
                  render: (renewalDate) => {
                    // Format the date using moment.js
                    const formattedDate = moment(renewalDate).format('YYYY-MM-DD HH:mm');
      
                    return <span>{formattedDate}</span>;
                  },
                },
              ]} 
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NewRenewal;
