
import React, { useEffect, useState } from "react";
import "../css/NewRenewal.css";
import { Menu, Tabs, Table, Input, Button, message } from "antd";
import axios from "axios";
import moment from 'moment';
import baseUrl from "../../../baseUrl";
import {BiArrowBack} from  'react-icons/bi';
import { useNavigate } from "react-router-dom";

const apiurl = baseUrl.apiUrl
const { TabPane } = Tabs;

const NewRenewal = () => {
  const navigate = useNavigate();
  const [newsUser, setNewuser] = useState([]);
  const [renewalUser, setRenewalUser] = useState([]);
  const [divChange, setDivChange] = useState(true);
  const [activeTab, setActiveTab] = useState('1');
  const [searchByUserId, setSearchByUserId] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);

  const handleMenuSelect = (item) => {
   
    if (item.key === "newaccount") {
      setDivChange(true);

    } else {
      setDivChange(false);

    }
  };
  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === '1') {
      callApiToNewAccounts();
      setSearchByUserId('')
      setButtonDisable(true)
    } else {
      callApiToRenewalUser();
      setSearchByUserId('');
      setButtonDisable(false);
    }
  };

  useEffect(() => {
    callApiToNewAccounts();
    callApiToRenewalUser();
  }, []);

  const columns = [
    {
      title: "Trader ID",
      dataIndex: "userid",
      key: "userid",
    },
    {
      title: 'Amount',
      dataIndex: 'activationAmount',
      key: 'activationAmount',
      render: (activationAmount) => {
        const formattedAmount = parseFloat(activationAmount).toFixed(2);
        return <span style={{ fontWeight: 'bold' }}>₹{formattedAmount}</span>;
      },
    },
    {
      title: 'Deposit Date',
      dataIndex: 'activationDate',
      key: 'activationDate',
      render: (activationDate) => {
        const formattedDate = moment(activationDate).format('YYYY-MM-DD HH:mm');
        return <span>{formattedDate}</span>;
      },
    },
  ];

  const columnsRenewal = [
    {
      title: "Trader ID",
      dataIndex: "userid",
      key: "userid",
    },
    {
      title: 'Amount',
      dataIndex: 'renewalAmount',
      key: 'renewalAmount',
      render: (renewalAmount) => {
        const formattedAmount = parseFloat(renewalAmount).toFixed(2);
        return <span style={{ fontWeight: 'bold' }}>₹{formattedAmount}</span>;
      },
    },
    {
      title: 'Deposit Date',
      dataIndex: 'renewalDate',
      key: 'renewalDate',
      render: (renewalDate) => {
        const formattedDate = moment(renewalDate).format('YYYY-MM-DD HH:mm');
        return <span>{formattedDate}</span>;
      },
    },
  ];

  const callApiToNewAccounts = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem("subAdminToken")
    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    };
    axios
      .post(
        `${apiurl}`+"/admin/fetch-all-new-paid-user",
        {},
        config
      )
      .then((res) => {
        setNewuser(res.data.data);
      })
      .catch((err) => {
      });

  };

  const callApiToRenewalUser = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem("subAdminToken")
    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    };
    axios
      .post(`${apiurl}`+"/admin/admin-fetch-all-renewal-user", {}, config)
      .then((res) => {
        setRenewalUser(res.data.data);
      })
      .catch((err) => {
        
      });
  };

  const searchByUserID = (e) => {
    e.preventDefault();
    setSearchByUserId(e.target.value)
    if (e.target.value === '') {
      callApiToNewAccounts();
      callApiToRenewalUser();
    }
  }
  const filterData = () => {
   
    let data = {
      userid: searchByUserId
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');;
    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    };
    axios.post(`${apiurl}`+"/admin/search-new-users", data, config)
      .then((res) => {
        
        setNewuser(res.data.newSearchUser)
      })
      .catch((err) => {
        message.warning(err.response.data.message)
      })
  }

  const filterDataRenewal = () => {
    let data = {
      userid: searchByUserId
    }
    const token = localStorage.getItem('adminToken') || localStorage.getItem('subAdminToken');;
    const config = {
      headers: { "Authorization": `Bearer ${token}` }
    };
    axios.post(`${apiurl}`+"/admin/search-renewal-users", data, config)
      .then((res) => {
        setRenewalUser(res.data.renewalSearchUser)
      })
      .catch((err) => {
        message.warning(err.response.data.message)
      })
  }
  const gotoHomePage = ()=>{
    navigate("/admindashboard/dashboard")
  }

  return (
    <>
      <div className="new-renewal-container">
        <div className="new-renewal-header">
          <div className="new-renewal-content">
            <p><BiArrowBack onClick={gotoHomePage} style={{cursor:'pointer'}}/>&nbsp;New/Renewal Traders</p>
            <div className="d-flex">
              <Input
                placeholder="User ID"
                onChange={searchByUserID}
                value={searchByUserId}
              />
              {
                buttonDisable ? <Button type="primary" onClick={filterData} style={{ background: 'white', color: 'black' ,marginBottom: "10px"}} disabled={!searchByUserId}>Search</Button>
                
                : <Button type="primary" onClick={filterDataRenewal} style={{ background: 'white', color: 'black' }} disabled={!searchByUserId}>Search</Button>}
            </div>
          </div>
                </div>

          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="New Account" key="1">
              <div>
                <Table dataSource={newsUser} columns={columns} scroll={{ y: 320, x: true }} pagination={{ pageSize: 7 }} style={{ padding: '5px',textOverflow: 'ellipsis',
            whiteSpace: 'nowrap' }} />
              </div>
            </TabPane>
            <TabPane tab="Renewal" key="2">
              <div> 
                <Table dataSource={renewalUser} columns={columnsRenewal} scroll={{ y: 320, x: true }} pagination={{ pageSize: 7 }} style={{ padding: '5px',textOverflow: 'ellipsis',
            whiteSpace: 'nowrap' }} />
              </div>
            </TabPane>
          </Tabs>
      </div>
    </>
  );
};

export default NewRenewal;

