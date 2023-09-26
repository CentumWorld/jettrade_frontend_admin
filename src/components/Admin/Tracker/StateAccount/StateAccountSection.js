import React, { useEffect, useState, useCallback } from 'react'
import './StateAccountSection.css'
import { Tabs, Table, Button, message, Modal, Radio } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa'
import baseUrl from '../../../../baseUrl';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const apiurl = baseUrl.apiUrl
const { TabPane } = Tabs;


const StateAccountSection = () => {
    const navigate = useNavigate();
    const { stateid } = useParams();
    const [stateTotalBalance, setStateTotalBalance] = useState(0);
    const [requestDetails, setRequestDetails] = useState([])
    const [approvedStateDetails, setApprovedStateDetails] = useState([])
    const [selectedValue, setSelectedValue] = useState(1);
    const [stateBankDetails, setStateBankDetails] = useState([]);
    const [stateUpiDetails, setUpiDetails] = useState([]);

    const handleRadioChange = (e) => {
        setSelectedValue(e.target.value);
        console.log(e.target.value)
    };



    useEffect(() => {
        callApiToGetStateHandlerToalBalance();
        callApiToGetRequestHistory();
        // callApiToGetApprovedHistory();
        // callApiToGetStateBankDetails();
        // callApiToGetStateUpiDetails();

    }, [])


    const columns = [
        {
            title: 'State ID',
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
            title: 'Bank/UPI',
            dataIndex: 'paymentBy',
            key: 'paymentBy',
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
            title: 'State ID',
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
        axios.post(`${apiurl}` +"/admin/admin-fetch-particular-state-handler-details", data, config)
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
        axios.post(`${apiurl}` +'/admin/admin-fetch-state-handler-payment-withdrawal-request', data, config)
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
                axios.post(`${apiurl}` +'/admin/approve-payment-request-of-state', requestData, config)
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

    const callApiToGetApprovedHistory = () => {
        let data = {
            stateHandlerId: stateid
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` +"/admin/admin-fetch-state-handler-approve-withdrawal", data, config)
            .then((res) => {
                setApprovedStateDetails(res.data.stateHandlerApproveWithdrawal)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }
    // bank details-----------------------------------------
    const columnForBankDetails = [
        {
            title: 'Holder name',
            dataIndex: 'accountHolderName',
            key: 'accountHolderName',
        },
        {
            title: 'Bank name',
            dataIndex: 'bankName',
            key: 'bankName',
        },
        {
            title: 'Branch name',
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: 'IFSC Code',
            dataIndex: 'ifscCode',
            key: 'ifscCode',
        },
        {
            title: 'Account no.',
            dataIndex: 'accountNumber',
            key: 'accountNumber',
        },
    ]
    const callApiToGetStateBankDetails = () => {
        let data = {
            stateHandlerId: stateid
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.post(`${apiurl}` +'/state/get-state-own-bank-details', data, config)
            .then((res) => {
                console.log(res.data)
                setStateBankDetails(res.data.stateBankDetails)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }
    // state upi id 
    const columnStateUpi = [
        {
            title: 'State ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'UPI ID',
            dataIndex: 'upiId',
            key: 'upiId',
        },
    ]

    const callApiToGetStateUpiDetails = () => {
        console.log('---------------')
        let data = {
            userId: stateid
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` +'/state/get-state-own-upi', data, config)
            .then((res) => {
                console.log(res.data)
                setUpiDetails(res.data.stateUpiId)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }
    const callApi = useCallback((key)=>{
        if(key === '1'){
            callApiToGetRequestHistory();
        }else if(key === '2'){
            callApiToGetApprovedHistory();
        }else if(key === '3'){
            callApiToGetStateBankDetails();
            callApiToGetStateUpiDetails();
        }
    })
    const gotoHome = ()=>{
        navigate("/admindashboard/tracker/state-tracer")
    }

    return (
        <>
            <div className='state-account-container'>
                <div className='state-account-header'>
                    <div> <BiArrowBack onClick={gotoHome} style={{cursor:'pointer'}}/>&nbsp;State Handler Account</div>
                    <div className='state-account-wallet'><FaRupeeSign />{stateTotalBalance}</div>
                </div>
            </div>
            <Tabs defaultActiveKey="1" onChange={callApi}>
                <TabPane tab="Request History" key="1">
                    <Table columns={columns} dataSource={requestDetails} scroll={{ x: 800, y: 350 }} />
                </TabPane>
                <TabPane tab="Approved History" key="2">
                    <Table columns={columnsApproved} dataSource={approvedStateDetails} scroll={{ x: 800, y: 350 }} />
                </TabPane>
                <TabPane tab="Bank Details" key="3">
                    <Radio.Group onChange={handleRadioChange} value={selectedValue} style={{ marginBottom: 10 }}>
                        <Radio value={1}>Bank</Radio>
                        <Radio value={2}>UPI</Radio>
                    </Radio.Group>
                {selectedValue === 1 ? <Table columns={columnForBankDetails} dataSource={stateBankDetails} scroll={{ x: 800, y: 350 }}/> :  <Table columns={columnStateUpi} dataSource={stateUpiDetails} scroll={{ x: 800, y: 350 }}/>}

                </TabPane>
            </Tabs>
        </>


    )
}

export default StateAccountSection