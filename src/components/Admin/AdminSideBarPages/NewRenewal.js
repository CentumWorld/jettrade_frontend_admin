
import React, { useEffect, useState } from "react";
import "../css/NewRenewal.css";
import { Menu,Tabs, Table } from "antd";
import axios from "axios";
import moment from 'moment';
import baseUrl from "../../../baseUrl";

const apiurl = baseUrl.apiUrl
const { TabPane } = Tabs;

const NewRenewal = () => {
  const [newsUser, setNewuser] = useState([]);
  const [renewalUser, setRenewalUser] = useState([]);
  const [divChange, setDivChange] = useState(true);
  const [activeTab, setActiveTab] = useState('1');

  const handleMenuSelect = (item) => {
    console.log("Selected menu item:", item.key);
    if (item.key === "newaccount") {
      setDivChange(true);
    } else {
      setDivChange(false);
    }
  };
  const handleTabChange = (key) => {
    setActiveTab(key);
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
  ];

  const callApiToNewAccounts = () => {
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    };
    axios
      .post(`${apiurl}` +
        "/admin/fetch-all-new-paid-user",
        {},
        config
      )
      .then((res) => {
        console.log(res.data.data);
        setNewuser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const callApiToRenewalUser = () => {
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    };
    axios
      .post(`${apiurl}` + "/admin/admin-fetch-all-renewal-user", {}, config)
      .then((res) => {
        console.log(res);
        setRenewalUser(res.data.data);
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

          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="New Account" key="1">
              <div>
              <Table dataSource={newsUser} columns={columns} scroll={{ y: 400, x: true }} pagination={{ pageSize: 5 }} style={{padding:'5px'}} />
              </div>
            </TabPane>
            <TabPane tab="Renewal" key="2">
              <div>
              <Table dataSource={renewalUser} columns={columnsRenewal} scroll={{ y: 400, x: true }} pagination={{ pageSize: 5 }}  />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default NewRenewal;

