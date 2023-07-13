import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/DisplayCard.css';

const DisplayCard = () => {
    const navigate = useNavigate();
    const [adminDetails, setAdminDetails] = useState({
        adminid: '',
    });
    
    useEffect(() => {
        setAdminDetails({ adminid: localStorage.getItem('adminId')})
       
    }, [])

    // joinChat
    const joinChatTrader = () => {
        navigate('/admindashboard/trader-chat');
    }
    const joinChatRefferal = () => {
        navigate('/admindashboard/refferal-chat');
    }

    // tradingChartView
    const tradingChartView = () => {
        navigate('/admindashboard/chart');
    }

    // viewUserDetails
    const viewUserDetails = () => {
        navigate('/admindashboard/user');
    }

    // viewRefferalrDetails
    const viewRefferalrDetails = () => {
        navigate('/admindashboard/refferal');
    }

    // viewWithdrawal
    const viewWithdrawal = () => {
        navigate('/admindashboard/withdrawal') ;
    }

    // pushNotification
    const pushNotification = () => {
        navigate('/admindashboard/manage/push-notification')
    }

    // viewSubscription
    const viewSubscription = () => {
        navigate('/admindashboard/manage/subscription')
    }

    // refferalPayoutTrader
    const refferalPayoutTrader = () => {
        navigate('/admindashboard/manage/investor-refferal-payout')
    }

    // refferalPayoutRefferal
    const refferalPayoutRefferal = () => {
        navigate('/admindashboard/manage/member-refferal-payout')
    }

    const goToRegister = () =>{
        navigate("/admindashboard/createuser")
    }

    return (
        <>
            <div className='card1-container'>
                <div className='card1'>
                    <div className='d-flex'>
                        <h6>UserID :</h6> &nbsp;&nbsp; <span style={{color:'yellow'}}>{adminDetails.adminid}</span>
                    </div>
                    <div className='d-flex'>
                        <h6>Refferal ID :</h6>&nbsp;&nbsp; <span style={{color:'yellow',cursor:'pointer'}} onClick={goToRegister}>admin@123</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='live-chat'>
                        <h6>Live Chat</h6>
                    </div>
                    <div className='d-flex'>
                        <h6>Trader:</h6>&nbsp;&nbsp; <span style={{color:'yellow',cursor:'pointer'}} onClick={joinChatTrader} >join</span>
                    </div>
                    <div className='d-flex'>
                        <h6>Refferal:</h6>&nbsp;&nbsp; <span style={{color:'yellow',cursor:'pointer'}} onClick={joinChatRefferal} >join</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='trading-chart'>
                        <h6>Trading Chart</h6>
                    </div>
                    <div className='trading-chart-view'>
                        <span style={{color:'yellow',cursor:'pointer'}} onClick={tradingChartView} >View</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='user-details'>
                        <h6>User Details</h6>
                    </div>
                    <div className='user-details-view'>
                        <span style={{color:'yellow',cursor:'pointer'}} onClick={viewUserDetails} >View</span>
                    </div>
                </div>
                <div className='card1'>
                <div className='refferal-details'>
                        <h6>Refferal Details</h6>
                    </div>
                    <div className='refferal-details-view'>
                        <span style={{color:'yellow',cursor:'pointer'}} onClick={viewRefferalrDetails} >View</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='withdrawal-card'>
                        <h6>Withdrawal</h6>
                    </div>
                    <div className='withdrawal-card-view'>
                        <span style={{color:'yellow',cursor:'pointer'}} onClick={viewWithdrawal}>View</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='push-notification-card'>
                        <h6>Push Notification</h6>
                    </div>
                    <div className='push-notification-card-view'>
                        <span style={{color:'yellow',cursor:'pointer'}} onClick={pushNotification}>Push</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='subscription-card'>
                        <h6>Subscription</h6>
                    </div>
                    <div className='subscription-card-view'>
                        <span style={{color:'yellow',cursor:'pointer'}} onClick={viewSubscription}>View</span>
                    </div>
                </div>
                <div className='card1'>
                    <div className='refferal-payout'>
                        <h6>Refferal Payout</h6>
                    </div>
                    <div className='d-flex'>
                        <h6>Trader:</h6>&nbsp;&nbsp; <span style={{color:'yellow',cursor:'pointer'}} onClick={refferalPayoutTrader} >View</span>
                    </div>
                    <div className='d-flex'>
                        <h6>Refferal:</h6>&nbsp;&nbsp; <span style={{color:'yellow',cursor:'pointer'}} onClick={refferalPayoutRefferal} >View</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DisplayCard