import React, { useState, useEffect } from 'react';
import '../css/RefferalPayout.css'
import axios from 'axios';
import { Table, Button, Modal, message, Tabs } from 'antd';
import moment from 'moment';
const { TabPane } = Tabs;

const MemberRefferalPayout = () => {
  const [refferralsDetails, setReferralsDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [ userRefferalApproedDetails, setUserRefferalApprovdDetails] = useState([])
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    fetchRefferalsDetails();
    // fetchRefferalApprovedDetails();
  }, []);

  const fetchRefferalsDetails = () => {
    const token = localStorage.getItem('adminToken')
    let config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }

    axios.get('/admin/admin-fetch-member-refferal-payout-request', config)
      .then((res) => {
        setReferralsDetails(res.data.result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // user details here
  const columns = [
    {
      title: 'Member ID',
      dataIndex: 'memberid',
      key: 'memberid',
    },
    {
      title: 'Wallet Amount',
      dataIndex: 'walletAmount',
      key: 'walletAmount',
      render: (text) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(text),
    },
    {
      title: 'Withdraw Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (text) => moment(text).format('DD/MM/YY HH:mm:ss')
    },
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Button type="primary" onClick={() => handleApproved(record._id)}>
    //       Approve
    //     </Button>
    //   ),
    // },
  ];

  // approved functin
  // const handleApproved = (id) => {
  //   Modal.confirm({
  //     title: 'Are you sure you want to confirm this request?',
  //     onOk: () => handleConfirm(id),
  //     onCancel: () => console.log('Cancel'),
  //     okText: 'Yes',
  //     cancelText: 'No',
  //   });

  // }

  // const handleConfirm = (id) => {
  //   let token = localStorage.getItem('adminToken')
  //   let data = {
  //     id: id
  //   }
  //   const config = {
  //     headers: { 'Authorization': `Bearer ${token}` }
  //   };

  //   axios.post('/admin/approve-member-refferal-payout', data, config)
  //     .then((res) => {
  //       message.success('Approved')
  //       fetchRefferalsDetails();
  //       fetchRefferalApprovedDetails();
  //     })
  //     .catch(err => {
  //       message.warning(err.response.data.message)
  //     })
  // }

  // approved list
  // const fetchRefferalApprovedDetails = () => {
  //   let token = localStorage.getItem('adminToken')
  //   const config = {
  //     headers: { 'Authorization': `Bearer ${token}` }
  //   };
  //   axios.get('/admin/fetch-member-refferal-payout-approve-withdrawal',config)
  //   .then((res)=>{
  //     console.log(res.data)
  //     setUserRefferalApprovdDetails(res.data.result)
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })
  // }

  // const columnsUser = [
  //   {
  //     title: 'Member ID',
  //     dataIndex: 'memberid',
  //     key: 'memberid',
  //   },
  //   {
  //     title: 'Wallet Amount',
  //     dataIndex: 'walletAmount',
  //     key: 'walletAmount',
  //     render: (text) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(text),
  //   },
  //   {
  //     title: 'Request Date',
  //     dataIndex: 'requestDate',
  //     key: 'requestDate',
  //     render: (text) => moment(text).format('DD/MM/YY HH:mm:ss')
  //   },
  //   {
  //     title: 'Approved Date',
  //     dataIndex: 'approveDate',
  //     key: 'approveDate',
  //     render: (text) => moment(text).format('DD/MM/YY HH:mm:ss')
  //   },
    
  // ];

  return (
    <div className='reffer-container'>
      <p> Member Refferal payout</p>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Request Payout" key="1">
          <div>
            <Table columns={columns} dataSource={refferralsDetails} scroll={{ y: 400, x: true }} />
          </div>
        </TabPane>
        {/* <TabPane tab="Approved Payout" key="2">
          <div>
            <Table columns={columnsUser} dataSource={userRefferalApproedDetails} scroll={{ y: 400, x: true }} />
          </div>
        </TabPane> */}
      </Tabs>

    </div>
  )
}

export default MemberRefferalPayout