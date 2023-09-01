import React, { useEffect, useState } from 'react'
import './StateAccountSection.css'
import { Tabs, Table, Button, message, Modal } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa'
const { TabPane } = Tabs;




const StateAccountSection = () => {
    const { stateid } = useParams();
    const [stateTotalBalance, setStateTotalBalance] = useState(0);
    const [requestDetails, setRequestDetails] = useState([])
    const [approvedStateDetails, setApprovedStateDetails] = useState([])
  

    useEffect(() => {
        callApiToGetStateHandlerToalBalance();
        callApiToGetRequestHistory();
        callApiToGetApprovedHistory();
    }, [])


    const columns = [
        {
            title: 'Id',
            dataIndex: 'stateHandlerId',
            key: 'stateHandlerId',
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
            dataIndex: 'stateHandlerId',
            key: 'stateHandlerId',
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
    const callApiToGetStateHandlerToalBalance = () => {
        console.log(stateid);
        let data = {
            stateHandlerId: stateid
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post("/admin/admin-fetch-particular-state-handler-details", data, config)
            .then((res) => {
                setStateTotalBalance(res.data.particularStateHandlerDetails.stateHandlerWallet)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    const callApiToGetRequestHistory = () => {
        console.log(stateid);
        let data = {
            stateHandlerId: stateid
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post('/admin/admin-fetch-state-handler-payment-withdrawal-request', data, config)
            .then((res) => {
                setRequestDetails(res.data.stateHandlerPaymentWithdrawalRequests)
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
                axios.post('/admin/approve-payment-request-of-state', requestData, config)
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

    const callApiToGetApprovedHistory = ()=>{
        let data = {
            stateHandlerId: stateid
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post("/admin/admin-fetch-state-handler-approve-withdrawal", data, config)
        .then((res)=>{
            setApprovedStateDetails(res.data.stateHandlerApproveWithdrawal)
        })
        .catch((err)=>{
            console.log(err.response.data.message)
        })
    }

    return (
        <>
            <div className='state-account-container'>
                <div className='state-account-header'>
                    <div>State Handler Account</div>
                    <div className='state-account-wallet'><FaRupeeSign />{stateTotalBalance}</div>
                </div>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Request History" key="1">
                    <Table columns={columns} dataSource={requestDetails} scroll={{ x: 800, y: 350 }} />
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

export default StateAccountSection