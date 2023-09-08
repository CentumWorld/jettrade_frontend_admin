import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import "../../Admin/Tracker/StateAccount/StateAccountSection.css"
import { Tabs, Table, Button, message, Modal, Radio } from 'antd';
import moment from 'moment';
import baseUrl from '../../../baseUrl';

const apiurl = baseUrl.apiUrl
const { TabPane } = Tabs;

const MemberAccountSection = () => {

    const { memberid } = useParams();
    const [memberTotalBalance, setMemberTotalBalance] = useState(0);
    const [requestDetails, setRequestDetails] = useState([])
    const [approvedMemberDetails, setApprovedMemberDetails] = useState([])
    const [selectedValue, setSelectedValue] = useState(1);
    const [memberBankDetails, setMemberBankDetails] = useState([]);
    const [memberUpiDetails, setMemberUpiDetails] = useState([]);
    const handleRadioChange = (e) => {
        setSelectedValue(e.target.value);
        console.log(e.target.value)
    };

    useEffect(() => {
        callApiToGetMemberToalBalance();
        callApiToGetRequestHistory();
        callApiToGetApprovedHistory();
         callApiToGetMemberBankDetails();
         callApiToGetMemberUpiDetails();

    }, [])

    
    const columns = [
        {
            title: 'Member Id',
            dataIndex: 'memberid',
            key: 'memberid',
        },
        {
            title: 'Amount',
            dataIndex: 'walletAmount',
            key: 'walletAmount',
            render: (walletAmount) =>
                new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 2,
                }).format(walletAmount),
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
            title: 'Member Id',
            dataIndex: 'memberid',
            key: 'memberid',
        },
        {
            title: 'Amount',
            dataIndex: 'walletAmount',
            key: 'walletAmount',
            render: (walletAmount) =>
                new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 2,
                }).format(walletAmount),
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
            title: 'Approved Date',
            dataIndex: 'approveDate',
            key: 'requestapproveDateDate',
            render: (dateTime) => moment(dateTime).format('Do MMMM YYYY, h:mm A'),
        },

    ];


    const callApiToGetMemberToalBalance = () => {
        console.log(memberid);
        let data = {
            memberId: memberid
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` +"/admin/fetch-particular-member-details-using-memberid", data, config)
            .then((res) => {
                console.log(res.data.particularMemberDetails.wallet,'49')
                setMemberTotalBalance(res.data.particularMemberDetails.wallet)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    const callApiToGetRequestHistory = () => {
        console.log(memberid);
        let data = {
            memberid: memberid
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` +'/admin/fetch-refferal-payout-withdrawal-request', data, config)
            .then((res) => {
                // console.log(res.data.memberWithdrawalRequest)
                setRequestDetails(res.data.memberWithdrawalRequest)
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
                axios.post(`${apiurl}` +'/admin/approve-member-refferal-payout', requestData, config)
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
            memberid: memberid
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` +"/admin/fetch-member-refferal-payout-approve-withdrawal", data, config)
            .then((res) => {
                setApprovedMemberDetails(res.data.memberApproveWithdrawal)
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
    const callApiToGetMemberBankDetails = () => {
        let data = {
            userId: memberid
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.post(`${apiurl}` +'/admin/get-member-bak-and-upi-details', data, config)
            .then((res) => {
                console.log(res.data)
                setMemberBankDetails(res.data.memberBankDetails)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }
    // member upi id 
    const columnMemberUpi = [
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'UPI ID',
            dataIndex: 'upiId',
            key: 'upiId',
        },
    ]

    const callApiToGetMemberUpiDetails = () => {
        console.log('---------------')
        let data = {
            userId: memberid
        }
        const token = localStorage.getItem('adminToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${apiurl}` +'/admin/get-member-bak-and-upi-details', data, config)
            .then((res) => {
                console.log(res.data)
                setMemberUpiDetails(res.data.memberUpiId)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    return (
       <>
         <div className="state-account-container">
            <div className="state-account-header">
                <div>Referral Account</div>
                <div className='state-account-wallet'><FaRupeeSign />{memberTotalBalance}</div>
            </div>
        </div>

        <Tabs defaultActiveKey="1">
                <TabPane tab="Request History" key="1">
                    <Table columns={columns} dataSource={requestDetails} scroll={{ x: 800, y: 350 }} />
                </TabPane>
                <TabPane tab="Approved History" key="2" >
                    <Table columns={columnsApproved} dataSource={approvedMemberDetails} scroll={{ x: 800, y: 350 }} />
                </TabPane>
                <TabPane tab="Bank Details" key="3">
                    <Radio.Group onChange={handleRadioChange} value={selectedValue} style={{ marginBottom: 10 }}>
                        <Radio value={1}>Bank</Radio>
                        <Radio value={2}>UPI</Radio>
                    </Radio.Group>
                    {selectedValue === 1 ? <Table columns={columnForBankDetails} dataSource={memberBankDetails} scroll={{ x: 800, y: 350 }}/> :  <Table columns={columnMemberUpi} dataSource={memberUpiDetails} scroll={{ x: 800, y: 350 }}/>}

                </TabPane>
            </Tabs>
       </>
    )
}

export default MemberAccountSection