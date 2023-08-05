import React, { useState, useEffect } from 'react';
import '../css/RefferalPayout.css'
import axios from 'axios';
import { Table, Button, Modal, message, Tabs, Input } from 'antd';
import moment from 'moment';
import baseUrl from '../../../baseUrl';

const apiurl = baseUrl.apiUrl
const { TabPane } = Tabs;


const RefferalPayout = () => {
  const [refferralsDetails, setReferralsDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [userRefferalApproedDetails, setUserRefferalApprovdDetails] = useState([]);
  const [searchByUserID, setSearchByUserID] = useState('');
  const [role, setRole] = useState('User');
  const handleTabChange = (key) => {
    setActiveTab(key);
    console.log(key);
    if(key === '1'){
      setRole('User')
      setSearchByUserID('');
      fetchTraderRefferalPayout("User");
    }else{
      setRole('Member')
      setSearchByUserID('')
      fetchMemberRefferalPayout("Member");
    }
  };

  useEffect(() => {
    fetchTraderRefferalPayout("User");
    fetchMemberRefferalPayout("Member");
  }, []);

  const fetchTraderRefferalPayout = (id) => {
    let data = {
      role: id
    }
    const token = localStorage.getItem('adminToken')
    let config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios.post(`${apiurl}` + '/admin/fetch-refferal-payout-on-role-basis', data, config)
      .then((res) => {
        setReferralsDetails(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // user details here
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'refferUserID',
      key: 'refferUserID',
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Wallet Amount',
      dataIndex: 'referralAmount',
      key: 'referralAmount',
      render: (text) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(text),
    },
    {
      title: 'Joining Date',
      dataIndex: 'joininigDate',
      key: 'joininigDate',
      render: (text) => moment(text).format('DD/MM/YY HH:mm:ss')
    },
    {
      title: 'New/Renewal',
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: 'Referral User',
      dataIndex: 'userid',
      key: 'userid',
    },

  ];

  //approved functin
  const handleApproved = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to confirm this request?',
      onOk: () => handleConfirm(id),
      onCancel: () => console.log('Cancel'),
      okText: 'Yes',
      cancelText: 'No',
    });

  }

  const handleConfirm = (id) => {
    let token = localStorage.getItem('adminToken')
    let data = {
      id: id
    }
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };

    axios.post('/admin/approve-user-refferal-payout', data, config)
      .then((res) => {
        message.success('Approved')
        fetchTraderRefferalPayout();
        fetchMemberRefferalPayout("Member");
      })
      .catch(err => {
        message.warning(err.response.data.message)
      })
  }

  //approved list
  const fetchMemberRefferalPayout = (id) => {
    const data = {
      role: id
    }
    let token = localStorage.getItem('adminToken')
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };
    axios.post(`${apiurl}` + '/admin/fetch-refferal-payout-on-role-basis', data, config)
      .then((res) => {
        console.log(res.data.data)
        setUserRefferalApprovdDetails(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const columnsUser = [
    {
      title: 'User ID',
      dataIndex: 'refferUserID',
      key: 'refferUserID',
      onFilter: (value, record) =>
        record.refferUserID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Wallet Amount',
      dataIndex: 'referralAmount',
      key: 'referralAmount',
      render: (text) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(text),
    },
    {
      title: 'Joining Date',
      dataIndex: 'joininigDate',
      key: 'joininigDate',
      render: (text) => moment(text).format('DD/MM/YY HH:mm:ss')
    },
    {
      title: 'New/Renewal',
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: 'Referral User',
      dataIndex: 'userid',
      key: 'userid',
    },

  ];

  const searchByUserId = (e) => {
    e.preventDefault();
    setSearchByUserID(e.target.value);
  }
  const search = ()=>{
    console.log(searchByUserID, role);
    const data = {
      role:role,
      refferUserID:searchByUserID
    }
    let token = localStorage.getItem('adminToken')
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };
    axios.post(`${apiurl}` + '/admin/search-refferal-payout-by-reffer-userid',data,config)
    .then((res)=>{
      setReferralsDetails(res.data.filterData)
      setUserRefferalApprovdDetails(res.data.filterData)
    })
    .catch((err)=>{
      message.warning(err.response.data.message)
    })
    
  }

  return (
    <div className='reffer-container'>
      <div className='refferal-container-header'>
        <div className='refferal-header-content'>
          <p>Referral Payout</p>
          <div>
            <Input
              placeholder='Serch by user Id'
              onChange={searchByUserId}
              style={{ width: '120px' }}
              value={searchByUserID}
            />
            <Button onClick={search} disabled={!searchByUserID} style={{background:'white'}}>Search</Button>
          </div>

        </div>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Trader Payout" key="1">
          <div>
            <Table columns={columns} dataSource={refferralsDetails} scroll={{ y: 400, x: true, y:320, textOverflow: 'ellipsis',
            // overflow: "hidden",
            whiteSpace: 'nowrap' }} />
          </div>
        </TabPane>
        <TabPane tab="Member Payout" key="2">
          <div>
            <Table columns={columnsUser} dataSource={userRefferalApproedDetails} scroll={{ y: 400, x: true }} />
          </div>
        </TabPane>
      </Tabs>

    </div>
  )
}

export default RefferalPayout