import React, { useEffect, useState } from 'react'
import '../StateAccount/StateAccountSection.css'
import { Tabs, Table, Button, message,Modal } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa'
import baseUrl from '../../../../baseUrl';

const apiurl = baseUrl.apiUrl
const { TabPane } = Tabs;




const FrenchiseAccountSection = () => {
    const { frenchiseId } = useParams();
    const [frenchiseTotalBalance, setFrenchiseTotalBalance] = useState(0);
    const [requestDetails, setRequestDetails] = useState([])
    const [approvedStateDetails, setApprovedStateDetails] = useState([])

    useEffect(() => {
        callApiToGetFrenchiseTotalBalance();
         callApiToGetRequestHistory();
         callApiToGetApprovedHistory();
    }, [])


    const columns = [
        {
            title: 'Id',
            dataIndex: 'franchiseId',
            key: 'franchiseId',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) =>
                new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 2,
                }).format(amount),
        },
        {
            title: 'Requset Date',
            dataIndex: 'requestDate',
            key: 'requestDate',
            render: (dateTime) => moment(dateTime).format('Do MMMM YYYY, h:mm A'),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Button type='primary' onClick={() => handleApprove(record._id)}>Approve</Button>
            ),
        },
    ];

      //approveDate
      const columnsApproved = [
        {
            title: 'Id',
            dataIndex: 'franchiseId',
            key: 'franchiseId',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) =>
                new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 2,
                }).format(amount),
        },
        {
            title: 'Requset Date',
            dataIndex: 'requestDate',
            key: 'requestDate',
            render: (dateTime) => moment(dateTime).format('Do MMMM YYYY, h:mm A'),
        },
        {
            title: 'Approved Date',
            dataIndex: 'approveDate',
            key: 'requestapproveDateDate',
            render: (dateTime) => moment(dateTime).format('Do MMMM YYYY, h:mm A'),
        },
       
    ];

    const callApiToGetFrenchiseTotalBalance = () => {
        console.log(frenchiseId);
        let data = {
            franchiseId: frenchiseId
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` +"/admin/admin-fetch-particular-franchise-details", data, config)
            .then((res) => {
                // console.log(res.data.particularFranchiseDetails.frenchiseWallet)
                 setFrenchiseTotalBalance(res.data.particularFranchiseDetails.frenchiseWallet)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    const callApiToGetRequestHistory = () => {
        console.log(frenchiseId);
        let data = {
            franchiseId: frenchiseId
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` +'/admin/admin-fetch-franchise-payment-withdrawl-request', data, config)
            .then((res) => {
                setRequestDetails(res.data.franchisePaymentWithdrawalRequests)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    };


    // handle APPROVE

    const handleApprove = (id) => {
        const requestData = {
            id: id,
        };

        const token = localStorage.getItem('adminToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        Modal.confirm({
            title: 'Confirm',
            content: 'Are you sure you want to proceed?',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk() {
                axios.post(`${apiurl}` +'/admin/approve-payment-request-of-franchise', requestData, config)
                    .then((res) => {
                        message.success(res.data.message);
                        callApiToGetRequestHistory();
                        callApiToGetApprovedHistory();
                    })
                    .catch((err) => {
                        console.log(err.response.data.message);
                    });
            },
            onCancel() {
                console.log('User clicked Cancel');
            },
        });
    };

    // approve history
    const callApiToGetApprovedHistory = ()=>{
        let data = {
            franchiseId: frenchiseId
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` +"/admin/admin-fetch-franchise-approve-withdrawl", data, config)
        .then((res)=>{
            setApprovedStateDetails(res.data.franchiseApproveWithdrawal)
        })
        .catch((err)=>{
            console.log(err.response.data.message)
        })
    }


    return (
        <>
            <div className='state-account-container'>
                <div className='state-account-header'>
                    <div>Frenchise Account</div>
                    <div className='state-account-wallet'><FaRupeeSign />{frenchiseTotalBalance}</div>
                </div>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Request History" key="1">
                    <Table columns={columns} dataSource={requestDetails} scroll={{ x: 800, y: 350 }}  />
                </TabPane>
                <TabPane tab="Approved History" key="2">
                <Table columns={columnsApproved} dataSource={approvedStateDetails} scroll={{ x: 800, y: 350 }} />
                </TabPane>
                <TabPane tab="Bank Details" key="3">
                    Content for Tab 3
                </TabPane>
            </Tabs>
        </>


    )
 }

export default FrenchiseAccountSection